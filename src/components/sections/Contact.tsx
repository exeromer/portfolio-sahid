import { techIcons } from "../../data/icons";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from "../ui/ScrollReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string, email?: string, message?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    }

    // Regex robusto: texto + @ + texto + . + texto (2+ caracteres)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formState.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Ingresa un email válido (ej: usuario@dominio.com)';
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = 'El mensaje no puede estar vacío';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setStatus('loading');
    setErrorMessage('');

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }

      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error) {
      console.error("Error enviando formulario:", error);
      setStatus('error');
      setErrorMessage('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50">
      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-16 flex flex-col items-center">
          {/* SCROLL REVEAL TEXT */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            rotationEnd="bottom center"
            wordAnimationEnd="bottom center"
            containerClassName="max-w-3xl"
            textClassName="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Hablemos de tu próximo proyecto
          </ScrollReveal>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mt-4"
          >
            ¿Tienes una idea en mente o necesitas escalar tu arquitectura actual?
            Estoy disponible para colaborar.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/*Info + CV Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/*  TARJETA DE CV */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="/cv.pdf"
                download="CV_Sahid_Romero.pdf"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative block cursor-pointer"
              >
                <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group-hover:border-blue-300 transition-colors flex items-center gap-5">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    {techIcons.FileCV}
                  </div>
                  <div className="grow">
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                      Descargar Currículum
                    </h4>
                    <p className="text-sm text-slate-500">PDF • Actualizado 2026</p>
                  </div>
                  <div className="p-2 text-slate-300 group-hover:text-blue-500 transition-colors">
                    {techIcons.Download}
                  </div>
                </div>
              </motion.a>
            </motion.div>

            {/*  Redes y Email */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Canales Directos</h3>
              <div className="space-y-6">
                {[
                  { href: "mailto:sahidromer@gmail.com", label: "sahidromer@gmail.com", icon: techIcons.Mail },
                  { href: "https://linkedin.com/in/sahidr", label: "linkedin.com/in/sahidr", icon: techIcons.Linkedin },
                  { href: "https://github.com/exeromer", label: "github.com/exeromer", icon: techIcons.GitHub }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('mailto') ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 text-slate-600 hover:text-blue-600 transition-colors group"
                  >
                    <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors w-12 h-12">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* COLUMNA DERECHA: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600"
                  >
                    {techIcons.Check}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-slate-600">Gracias por contactarme. Te responderé a la brevedad.</p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                    {techIcons.Error}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Error al enviar el mensaje</h3>
                  <p className="text-slate-600 mb-4">{errorMessage || 'Algo salió mal.'}</p>
                  <button onClick={() => setStatus('idle')} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Intentar de nuevo o contactar desde canal directo</button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre completo' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'nombre@empresa.com' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    required
                    // @ts-ignore
                    value={formState[field.id]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-slate-400"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === 'loading' ? (
                  <>
                    {techIcons.Loader}
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    {techIcons.Send}
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};