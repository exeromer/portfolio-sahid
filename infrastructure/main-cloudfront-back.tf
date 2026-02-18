/* # 1. CONFIGURACIÓN DEL PROVEEDOR (HashiCorp docs)
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

# 2. S3 Bucket
resource "aws_s3_bucket" "portfolio" {
  bucket = "portfolio-sahid-web-2026" 
}

# Bloqueamos el acceso público al bucket (Seguridad máxima)
resource "aws_s3_bucket_public_access_block" "portfolio_block" {
  bucket                  = aws_s3_bucket.portfolio.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 3. SEGURIDAD DE ORIGEN (OAC)
# Esta es la "credencial" que usa CloudFront para leer el S3.
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "oac-portfolio-sahid"
  description                       = "OAC para el portafolio de Sahid"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# 4. RED DE DISTRIBUCIÓN (CloudFront CDN)
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "S3-${aws_s3_bucket.portfolio.bucket}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html" # El archivo principal de Vite

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.portfolio.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https" # Obliga a usar candadito verde
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none" # Disponible para todo el mundo
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true # Certificado SSL gratuito de AWS
  }
}

# 5. POLÍTICA DEL BUCKET S3
# Regla IAM: Solo CloudFront puede leer (GetObject)
resource "aws_s3_bucket_policy" "portfolio_bucket_policy" {
  bucket = aws_s3_bucket.portfolio.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.portfolio.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

# 6. OUTPUTS
# Suelta la URL
output "website_url" {
  value       = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
  description = "La URL publica de tu portafolio en CloudFront"
} */