document.addEventListener('DOMContentLoaded', () => {
    const daySelector = document.getElementById('day-selector');
    const exerciseDisplay = document.getElementById('exercise-display');
    const dayButtons = document.querySelectorAll('.day-btn');

    // --- Definición de la Rutina Semanal ---
    const weekRoutine = {
        'day-1': { // HSR
            type: 'HSR',
            exercises: [
                {
                    name: 'Calentamiento',
                    instructions: '5 minutos de cardio ligero (bicicleta estática, caminar).',
                    sets: 'N/A',
                    reps: '5 min',
                    rest: 'N/A',
                    tempo: 'N/A'
                },
                {
                    name: 'Sentadilla con Talones Elevados (Peso Corporal)',
                    instructions: [
                        'Coloca los talones sobre un pequeño disco o libro (2-5 cm).',
                        'Mantén el tronco lo más erguido posible.',
                        'Baja LENTAMENTE contando hasta 3.',
                        'Haz una pausa de 1 segundo abajo (sin rebotar, mantén tensión).',
                        'Sube LENTAMENTE contando hasta 3.',
                        'Baja solo hasta un punto donde el dolor sea tolerable (≤ 4-5/10).'
                    ],
                    sets: '3',
                    reps: '10',
                    rest: '2 minutos',
                    tempo: '3 seg bajar / 1 seg pausa / 3 seg subir'
                }
                // Puedes añadir estiramientos suaves aquí si quieres
            ]
        },
        'day-2': { // Isométrico
            type: 'Isométrico',
            exercises: [
                {
                    name: 'Wall Sit (Sentadilla Isométrica en Pared)',
                    instructions: [
                        'Apoya la espalda recta contra la pared.',
                        'Deslízate hacia abajo hasta que las rodillas formen un ángulo entre 60° y 90° (elige el ángulo más cómodo y con dolor tolerable ≤ 4-5/10).',
                        'Mantén la posición sin moverte.',
                        'La sensación de esfuerzo debe ser alrededor de un 7/10 de tu máximo.',
                        'Puedes hacer esta sesión 1 o 2 veces en el día.'
                    ],
                    sets: '3-4',
                    reps: 'Mantener 45 segundos',
                    rest: '2 minutos',
                    tempo: 'Isométrico (mantener)'
                }
            ]
        },
        'day-3': { // HSR - Repite Día 1
            type: 'HSR',
            exercises: [ /* Copia y pega desde day-1 si quieres ser explícito o usa una referencia */
                { name: 'Calentamiento', instructions: '5 minutos de cardio ligero.', sets: 'N/A', reps: '5 min', rest: 'N/A', tempo: 'N/A'},
                { name: 'Sentadilla con Talones Elevados (Peso Corporal)', instructions: ['Como Día 1.'], sets: '3', reps: '10', rest: '2 minutos', tempo: '3 / 1 / 3'}
            ]
        },
        'day-4': { // Isométrico - Repite Día 2
            type: 'Isométrico',
            exercises: [ /* Copia y pega desde day-2 o usa referencia */
                 { name: 'Wall Sit (Sentadilla Isométrica en Pared)', instructions: ['Como Día 2.'], sets: '3-4', reps: 'Mantener 45 segundos', rest: '2 minutos', tempo: 'Isométrico'}
            ]
        },
        'day-5': { // HSR - Repite Día 1
            type: 'HSR',
            exercises: [ /* Copia y pega desde day-1 o usa referencia */
                { name: 'Calentamiento', instructions: '5 minutos de cardio ligero.', sets: 'N/A', reps: '5 min', rest: 'N/A', tempo: 'N/A'},
                { name: 'Sentadilla con Talones Elevados (Peso Corporal)', instructions: ['Como Día 1.'], sets: '3', reps: '10', rest: '2 minutos', tempo: '3 / 1 / 3'}
            ]
        },
        'day-6': { // Descanso o Isométrico
            type: 'Descanso/Isométrico',
            exercises: [
                {
                    name: 'Descanso Activo o Isométricos',
                    instructions: 'Descanso completo, caminata ligera, o si te sientes bien y ayuda con el dolor, puedes hacer 1 sesión de Wall Sit (como Día 2). Escucha a tu cuerpo.',
                    sets: 'Opcional',
                    reps: 'Opcional',
                    rest: 'N/A',
                    tempo: 'N/A'
                }
            ]
        },
        'day-7': { // Descanso o Isométrico
             type: 'Descanso/Isométrico',
            exercises: [
                 {
                    name: 'Descanso Activo o Isométricos',
                    instructions: 'Descanso completo, caminata ligera, o si te sientes bien y ayuda con el dolor, puedes hacer 1 sesión de Wall Sit (como Día 2). Escucha a tu cuerpo.',
                    sets: 'Opcional',
                    reps: 'Opcional',
                    rest: 'N/A',
                    tempo: 'N/A'
                }
            ]
        }
    };

    // --- Lógica para Mostrar Ejercicios ---
    function displayExercises(dayId) {
        exerciseDisplay.innerHTML = ''; // Limpiar vista previa
        const dayData = weekRoutine[dayId];

        if (!dayData || !dayData.exercises || dayData.exercises.length === 0) {
            exerciseDisplay.innerHTML = '<p>No hay ejercicios programados para este día.</p>';
            return;
        }

        dayData.exercises.forEach((exercise, index) => {
            const exerciseItem = document.createElement('div');
            exerciseItem.classList.add('exercise-item');
            exerciseItem.dataset.exerciseIndex = index; // Para identificar el ejercicio

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('exercise-details');

            const name = document.createElement('h3');
            name.textContent = exercise.name;
            detailsDiv.appendChild(name);

            // Mostrar instrucciones como lista o párrafo
            if (Array.isArray(exercise.instructions)) {
                const instructionsList = document.createElement('ul');
                exercise.instructions.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    instructionsList.appendChild(li);
                });
                detailsDiv.appendChild(instructionsList);
            } else {
                 const instructions = document.createElement('p');
                 instructions.innerHTML = `<strong>Instrucciones:</strong> ${exercise.instructions}`;
                 detailsDiv.appendChild(instructions);
            }


            const params = document.createElement('p');
            params.innerHTML = `<strong>Series:</strong> ${exercise.sets} | <strong>Reps/Tiempo:</strong> ${exercise.reps} | <strong>Descanso:</strong> ${exercise.rest} | <strong>Tempo:</strong> ${exercise.tempo}`;
            detailsDiv.appendChild(params);

            exerciseItem.appendChild(detailsDiv);

            // Botón para marcar completado
            const completeBtn = document.createElement('button');
            completeBtn.classList.add('complete-btn');
            completeBtn.textContent = '✓ Completar';
            completeBtn.addEventListener('click', () => {
                exerciseItem.classList.toggle('completed');
                // Cambiar texto del botón si se desea
                 if (exerciseItem.classList.contains('completed')) {
                    completeBtn.textContent = '✓ Completo';
                } else {
                    completeBtn.textContent = '✓ Completar';
                }
            });

             // No añadir botón de completar al calentamiento o descanso
            if (exercise.name.toLowerCase() !== 'calentamiento' && !exercise.name.toLowerCase().includes('descanso')) {
                exerciseItem.appendChild(completeBtn);
            }


            exerciseDisplay.appendChild(exerciseItem);
        });
    }

    // --- Añadir Event Listeners a los Botones de Día ---
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa de otros botones
            dayButtons.forEach(btn => btn.classList.remove('active-day'));
            // Añadir clase activa al botón clickeado
            button.classList.add('active-day');
            // Mostrar los ejercicios del día seleccionado
            displayExercises(button.id);
        });
    });

    // --- Carga Inicial ---
    // Mostrar Día 1 por defecto
    const initialDay = 'day-1';
    const initialButton = document.getElementById(initialDay);
    if (initialButton) {
        initialButton.classList.add('active-day');
        displayExercises(initialDay);
    } else {
         exerciseDisplay.innerHTML = '<p>Error al cargar la rutina inicial.</p>';
    }
});
