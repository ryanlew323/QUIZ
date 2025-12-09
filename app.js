// Array de objetos que contiene las preguntas del cuestionario de enfermería
const preguntas = [
  {
    pregunta: "¿Qué significa el acrónimo 'PVC' en enfermería?",
    opciones: ["Presión Venosa Central", "Pulso Ventricular Central", "Presión Vascular Cardíaca", "Punción Venosa Central"],
    respuestaCorrecta: 3,
    mostrarNota: true,
    nota: {
      titulo: "QUE GANAS TENGO",
      mensaje: 'Que ganas tengo de verte, que ganas tengo de volver a mirarme en tus ojos bonitos, de estrecharte entre mis brazos y decirte bajito al oído, <em style="font-style: italic;">"te eché de menos, mi amor"</em>'
    }
  },
  {
    pregunta: "¿Cuál es la posición correcta para prevenir la aspiración en pacientes encamados?",
    opciones: [
        "Acostado boca arriba (supino)", 
        "Inclinado con pies elevados (Trendelenburg)", 
        "Semi-sentado inclinado (Fowler alta 30-45°)", 
        "Acostado boca abajo (prono)"
    ],
    respuestaCorrecta: 2, // Semi-sentado inclinado sigue siendo la correcta
    mostrarNota: true,
    nota: {
      titulo: "RICO",
      mensaje: "Oler a ti después de abrazarte."
    }
  },
  {
    pregunta: "¿Qué se mide con un oxímetro de pulso?",
    opciones: ["Presión arterial", "Saturación de oxígeno en sangre", "Frecuencia cardíaca", "Temperatura corporal"],
    respuestaCorrecta: 1,
    mostrarNota: true,
    nota: {
      titulo: "NALGUEAR",
      mensaje: "No es que quiera hacerlo es que ese trasero tuyo merece un aplauso."
    }
  },
  {
    pregunta: "¿Qué significa 'NPO' en las órdenes médicas?",
    opciones: ["Nada por vía oral", "Nutrición parenteral obligatoria", "Nivel de presión ocular", "Ningún procedimiento operatorio"],
    respuestaCorrecta: 0,
    mostrarNota: true,
    nota: {
      titulo: "LENGUA",
      mensaje: "Órgano sexual que la gente usa para hablar."
    }
  },
  {
    pregunta: "¿Cuál es el valor normal de la presión arterial en un adulto sano?",
    opciones: ["120/80 mmHg", "140/90 mmHg", "100/60 mmHg", "160/100 mmHg"],
    respuestaCorrecta: 0,
    mostrarNota: true,
    nota: {
      titulo: "PUNTITA",
      mensaje: "Palabra atrevida que significa hasta el fondo y sin compasión."
    }
  }
];

// Variables para almacenar el índice de la pregunta actual y el puntaje
let indicePreguntaActual = 0;
let puntaje = 0;
const totalPreguntas = preguntas.length;

// Guardar el puntaje en localStorage para poder recuperarlo en resultado.html
function guardarPuntajeEnStorage() {
  localStorage.setItem('puntajeCuestionario', puntaje);
  localStorage.setItem('totalPreguntas', totalPreguntas);
}

// Mostrar el número total de preguntas
document.getElementById('total-preguntas').innerText = totalPreguntas;

// Llamar a la función para mostrar la primera pregunta
mostrarPregunta();

// Función para mostrar la pregunta actual y sus opciones
function mostrarPregunta() {
  const preguntaActual = preguntas[indicePreguntaActual];

  document.getElementById('numero-pregunta').innerText = indicePreguntaActual + 1;
  document.getElementById('pregunta').innerText = preguntaActual.pregunta;

  const contenedorOpciones = document.getElementById('opciones');
  //Se vacia el contenedor para agregar nuevas opciones
  contenedorOpciones.innerHTML = '';

  // Crear botones para cada opción y añadirlos al contenedor
  for (let i = 0; i < preguntaActual.opciones.length; i++) {
    const boton = document.createElement('button');
    boton.innerText = preguntaActual.opciones[i];
    boton.onclick = () => verificarRespuesta(i, boton);
    contenedorOpciones.appendChild(boton);
  }

  // Mostrar la nota si la pregunta tiene la propiedad mostrarNota en true
  if (preguntaActual.mostrarNota) {
    mostrarNotaEspecial(preguntaActual.nota);
  } else {
    ocultarNotaEspecial();
  }

  // Manejar la visibilidad del botón "Siguiente" - cambiar a "Ver Resultado" en la última pregunta
  const botonSiguiente = document.getElementById('boton-siguiente');
  if (indicePreguntaActual === totalPreguntas - 1) {
    botonSiguiente.textContent = "Ver Resultado";
    botonSiguiente.onclick = mostrarResultadoFinal; // Cambiar la función al hacer clic
  } else {
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.onclick = mostrarSiguientePregunta; // Función original
    botonSiguiente.style.display = 'block';
  }
}

// Función para mostrar la nota especial
function mostrarNotaEspecial(notaContenido) {
  // Verificar si ya existe el contenedor de la nota
  let notaContainer = document.getElementById('nota-especial');
  
  if (!notaContainer) {
    // Crear el contenedor principal
    notaContainer = document.createElement('div');
    notaContainer.id = 'nota-especial';
    notaContainer.style.marginTop = '20px';
    notaContainer.style.padding = '15px';
    notaContainer.style.backgroundColor = '#f0f8ff';
    notaContainer.style.borderRadius = '8px';
    notaContainer.style.borderLeft = '4px solid #3498DB';
    notaContainer.style.textAlign = 'left';
    
    // Insertar después del contenedor de opciones
    const contenedorOpciones = document.getElementById('opciones');
    contenedorOpciones.parentNode.insertBefore(notaContainer, contenedorOpciones.nextSibling);
  }
  
  // Actualizar el contenido del contenedor
  notaContainer.innerHTML = '';
  
  // Crear el título "Nota"
  const tituloNota = document.createElement('div');
  tituloNota.innerHTML = '<strong style="font-size: 18px; color: #000000;">Nota</strong>';
  
  const subtitulo = document.createElement('div');
  subtitulo.innerHTML = `<strong style="font-size: 22px; color: #000000; margin: 10px 0;">${notaContenido.titulo}</strong>`;
  
  // Crear el mensaje personalizado
  const mensaje = document.createElement('div');
  mensaje.innerHTML = notaContenido.mensaje;
  mensaje.style.fontSize = '16px';
  mensaje.style.color = '#000000';
  mensaje.style.lineHeight = '1.5';
  mensaje.style.marginTop = '5px';
  
  // Agregar elementos al contenedor
  notaContainer.appendChild(tituloNota);
  notaContainer.appendChild(subtitulo);
  notaContainer.appendChild(mensaje);
  
  // Mostrar el contenedor
  notaContainer.style.display = 'block';
}

// Función para ocultar la nota especial
function ocultarNotaEspecial() {
  const notaContainer = document.getElementById('nota-especial');
  if (notaContainer) {
    notaContainer.style.display = 'none';
  }
}

// Función para verificar la respuesta seleccionada por el usuario
function verificarRespuesta(indice, botonSeleccionado) {
  const preguntaActual = preguntas[indicePreguntaActual];
  const botones = document.querySelectorAll('#opciones button');

  // Verificar si la opción seleccionada es la correcta
  if (indice === preguntaActual.respuestaCorrecta) {
    botonSeleccionado.classList.add('correcto');
    puntaje++; 
  } else {
    botonSeleccionado.classList.add('incorrecto');
  }

  // Deshabilitar todos los botones después de seleccionar una opción
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    if (i === preguntaActual.respuestaCorrecta) {
      botones[i].classList.add('correcto');
    }
  }
}

// Función para mostrar la siguiente pregunta o el puntaje final
function mostrarSiguientePregunta() {
  // Ocultar la nota especial antes de cambiar de pregunta
  ocultarNotaEspecial();
  
  // Verificar si hay más preguntas
  if (indicePreguntaActual < totalPreguntas - 1) {
    indicePreguntaActual++;
    mostrarPregunta();
  } else {
    // Mostrar resultado final cuando es la última pregunta
    mostrarResultadoFinal();
  }
}

// Función para mostrar el resultado final y redirigir
function mostrarResultadoFinal() {
  // Guardar el puntaje en localStorage antes de redirigir
  guardarPuntajeEnStorage();
  
  // Redirigir a la página de resultados
  window.location.href = "resultado.html";
}

// Función para reiniciar el juego
function reiniciarJuego() {
  indicePreguntaActual = 0;
  puntaje = 0;
  
  // Restaurar elementos a su estado inicial
  document.getElementById('puntaje').style.display = 'none';
  document.getElementById('boton-reiniciar').style.display = 'none';
  document.getElementById('boton-siguiente').style.display = 'block';
  document.getElementById('boton-siguiente').textContent = "Siguiente";
  document.getElementById('boton-siguiente').onclick = mostrarSiguientePregunta;
  
  // Asegurarse de ocultar la nota especial al reiniciar
  ocultarNotaEspecial();

  mostrarPregunta();
}