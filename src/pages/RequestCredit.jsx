//Importaciones
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "../styles/solicitar.css";

// Estados del formulario de solicitud de crédito
// Cada useState guarda un dato o control del formulario
const RequestCredit = () => {
  const [nombre, setNombre] = useState(""); 
  const [cedula, setCedula] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoCredito, setTipoCredito] = useState("");

  // Manejo de errores
  const [errors, setErrors] = useState({}); 
  const [cuota, setCuota] = useState(null); 
  const [resumenVisible, setResumenVisible] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]); 
  const [success, setSuccess] = useState(false); 
  const [formError, setFormError] = useState(""); // <-- AGREGADO (NO afecta tus comentarios)

  // VALIDACIONES EN TIEMPO REAL
  const validate = (field, value) => { 
    let newErrors = { ...errors }; 

    if (field === "nombre" && value.trim().length < 3) { 
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else {
      delete newErrors.nombre; 
    }

    //!/^\d{10}$/.test(value)
    //Esto revisa si el valor NO cumple con el formato correcto.
    // /^\d{10}$/ → expresión regular
    // /^ → inicio  \d → dígito  {10} → exactamente 10 dígitos $ → final
    
    if (field === "cedula" && !/^\d{6,10}$/.test(value)) {
      newErrors.cedula = "La cédula debe ser numérica y entre 6 y 10 dígitos.";
    } else {
      delete newErrors.cedula;
    }

    if (field === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.correo = "Correo no válido.";
    } else {
      delete newErrors.correo;
    }

    if (field === "telefono" && !/^\d{10}$/.test(value)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos.";
    } else {
      delete newErrors.telefono;
    }
  
    setErrors(newErrors); 
  };

  // VALIDACIÓN FINAL DE TODO EL FORMULARIO 
  const validateAll = () => {
    let newErrors = {};

    if (nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!/^\d{6,10}$/.test(cedula)) {
      newErrors.cedula = "La cédula debe ser numérica y entre 6 y 10 dígitos.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      newErrors.correo = "Correo no válido.";
    }

    if (!/^\d{10}$/.test(telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  // CÁLCULO CUOTA
  const calcularCuota = (monto, plazo) => {
    if (!monto || !plazo) return null; 

    const tasaMensual = 0.015;
    const p = parseFloat(monto); 
    const n = parseInt(plazo); 

    //(monto * tasaMensual) / (1 - (1+tasaMensual)^-plazo)
    const cuotaCalc =
      (p * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));

    return cuotaCalc.toFixed(2); 
  };

  const handleMontoPlazoChange = (field, value) => { 
    if (field === "monto") setMonto(value); 
    if (field === "plazo") setPlazo(value); 

    const updatedMonto = field === "monto" ? value : monto;
    const updatedPlazo = field === "plazo" ? value : plazo;

    setCuota(calcularCuota(updatedMonto, updatedPlazo)); 
  };

  // *** VALIDACIÓN ANTES DE MOSTRAR RESUMEN ***
  const handleResumen = () => {
    const validationErrors = validateAll(); // <-- NUEVO

    if (!nombre || !cedula || !correo || !telefono || !monto || !plazo || !tipoCredito) {
      setFormError("Por favor completa todos los campos antes de continuar.");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormError("Corrige los errores marcados antes de continuar.");
      return;
    }

    setFormError("");
    setResumenVisible(true);
  };

  // ENVIAR SOLICITUD
  const enviarSolicitud = () => {
    const nuevaSolicitud = { 
      nombre,
      cedula,
      correo,
      telefono,
      monto,
      plazo,
      cuota,
      tipoCredito 
    };

    //MEMORIA TEMPORAL.
    setSolicitudes([...solicitudes, nuevaSolicitud]); 

    setSuccess(true); 
    setResumenVisible(false);

    // limpiar
    setNombre("");
    setCedula("");
    setCorreo("");
    setTelefono("");
    setMonto("");
    setPlazo("");
    setCuota(null);
    setTipoCredito(""); 

    setTimeout(() => setSuccess(false), 3000); 
  };

  return (
    <>

      {/* HERO */}
      <Hero 
        titulo="Solicitar Crédito"
        parrafos={["Completa el formulario con tu información y el tipo de crédito que deseas.",
          "Con estos datos podremos evaluar tu perfil, orientarte de la mejor manera y brindarte una oferta justa, transparente y hecha a tu medida."
        ]}
      />

      <div className="solicitar-container">

        <h2 className="titulo-formulario">Formulario de Solicitud</h2>

        <form className="formulario">

          {/* NOMBRE */}
          <div className="grupo">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={nombre} 
              onChange={(e) => { 
                setNombre(e.target.value); 
                validate("nombre", e.target.value); 
              }}
              onBlur={(e) => validate("nombre", e.target.value)} 
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>} 
          </div>

          {/* CÉDULA */}
          <div className="grupo">
            <label>Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => {
                setCedula(e.target.value);
                validate("cedula", e.target.value);
              }}
              onBlur={(e) => validate("cedula", e.target.value)} 
            />
            {errors.cedula && <span className="error">{errors.cedula}</span>}
          </div>

          {/* CORREO */}
          <div className="grupo">
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                validate("correo", e.target.value);
              }}
              onBlur={(e) => validate("correo", e.target.value)} 
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
          </div>

          {/* TELEFONO */}
          <div className="grupo">
            <label>Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                validate("telefono", e.target.value);
              }}
              onBlur={(e) => validate("telefono", e.target.value)} 
            />
            {errors.telefono && <span className="error">{errors.telefono}</span>}
          </div>

          {/* SELECT TIPO DE CRÉDITO */}
          <div className="grupo">
            <label>Tipo de Crédito</label>
            <select
              value={tipoCredito}
              onChange={(e) => setTipoCredito(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              <option value="Libre Inversión">Libre Inversión</option>
              <option value="Vehículo">Crédito vehicular</option>
              <option value="Vivienda">Crédito vivienda</option>
              <option value="Educativo">Crédito educativo</option>
              <option value="Agropecuario">Crédito agropecuario</option>
              <option value="Empresarial">Crédito empresarial</option>
            </select>
          </div>

          {/* MONTO */}
          <div className="grupo">
            <label>Monto solicitado</label>
            <input
              type="number"
              min="500000"
              value={monto}
              onChange={(e) => handleMontoPlazoChange("monto", e.target.value)}
            />
          </div>

          {/* PLAZO */}
          <div className="grupo">
            <label>Plazo (meses)</label>
            <select
              value={plazo}
              onChange={(e) => handleMontoPlazoChange("plazo", e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>

          {/* CUOTA */}
          {cuota && (
            <p className="cuota">
              Cuota mensual estimada: <strong>${cuota}</strong>
            </p>
          )}

          {/* BOTÓN RESUMEN */}
          <button
            className="btn-morado"
            type="button"
            onClick={handleResumen}
          >
            Ver Resumen
          </button>

          {formError && <p className="error-enviar">{formError}</p>}
        </form>

        {/* RESUMEN */}
        {resumenVisible && (
          <div className="resumen">
            <h3>Resumen de la solicitud</h3>

            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Cédula:</strong> {cedula}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>

            <p><strong>Tipo de crédito:</strong> {tipoCredito}</p>

            <p><strong>Monto:</strong> ${monto}</p>
            <p><strong>Plazo:</strong> {plazo} meses</p>
            <p><strong>Cuota mensual:</strong> ${cuota}</p>

            <button className="btn-rosa" onClick={enviarSolicitud}>
              Enviar Solicitud
            </button>
          </div>
        )}

        {/* ÉXITO */}
        {success && (
          <div className="exito"> 
            ¡Solicitud enviada con éxito! 🎉
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default RequestCredit;
