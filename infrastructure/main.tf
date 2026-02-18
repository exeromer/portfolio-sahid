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

# 1. EL BUCKET
resource "aws_s3_bucket" "portfolio" {
  bucket = "portfolio-sahid-web-2026" 
}

# 2. ACTIVAR "STATIC WEBSITE HOSTING" EN S3
resource "aws_s3_bucket_website_configuration" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio.id

  index_document {
    suffix = "index.html"
  }

  # En una SPA como React, los errores deben ir al index
  error_document {
    key = "index.html"
  }
}

# 3. QUITAR EL CANDADO PÚBLICO
resource "aws_s3_bucket_public_access_block" "portfolio_block" {
  bucket                  = aws_s3_bucket.portfolio.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 4. POLÍTICA DE LECTURA PÚBLICA AL BUCKET
resource "aws_s3_bucket_policy" "public_read_policy" {
  bucket = aws_s3_bucket.portfolio.id
  policy = data.aws_iam_policy_document.public_read.json

  # AWS exige quitar el candado antes de aplicar una política pública
  depends_on = [aws_s3_bucket_public_access_block.portfolio_block]
}

data "aws_iam_policy_document" "public_read" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.portfolio.arn}/*"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

# 5. OUTPUT CON LA NUEVA URL NATIVA DE S3
output "website_url" {
  value       = "http://${aws_s3_bucket_website_configuration.portfolio_website.website_endpoint}"
  description = "URL temporal de portafolio directo a S3"
}