document.addEventListener('DOMContentLoaded', () => {
    const daySelector = document.getElementById('day-selector');
    const exerciseDisplay = document.getElementById('exercise-display');
    const dayButtons = document.querySelectorAll('.day-btn');

    // --- Definición de la NUEVA Rutina Semanal Avanzada ---
    const weekRoutine = {
        'day-1': { // Rodilla HSR
            type: 'Rodilla HSR',
            exercises: [
                { name: 'Calentamiento', instructions: '5 minutos de cardio ligero (bici, caminar).', sets: 'N/A', reps: '5 min', rest: 'N/A', tempo: 'N/A'},
                {
                    name: 'Sentadilla con Talones Elevados (Peso Corporal)',
                    instructions: ['Coloca talones en disco/libro (2-5 cm).', 'Tronco erguido.', 'Baja en 3 seg.', 'Pausa 1 seg abajo.', 'Sube en 3 seg.', 'Dolor tolerable (≤ 4-5/10).'],
                    sets: '3', reps: '10', rest: '2 minutos', tempo: '3 / 1 / 3'
                }
            ]
        },
        'day-2': { // Tobillo/Pantorrilla Avanzado
            type: 'Tobillo/Pantorrilla',
            exercises: [
                {
                    name: 'Movilización Tobillo Rodilla a Pared',
                    instructions: ['Calentamiento dinámico.', 'Talón siempre en el suelo.', 'Lleva rodilla a tocar pared sin levantar talón.', 'Siente rango final.'],
                    sets: '2', reps: '15 por pierna', rest: 'Alternar', tempo: 'Controlado'
                },
                {
                    name: 'PNF Contraer-Relajar (CR) Gemelo (Rodilla Recta)',
                    instructions: ['1. Estira suave 10s.', '2. CONTRAER isométrico (empuja punta pie vs suelo) 6-8s (50-70% esfuerzo).', '3. RELAJAR 2-3s.', '4. ESTIRAR suavemente a nuevo rango 15-20s.'],
                    sets: '2-3 ciclos', reps: 'por pierna', rest: '30 seg', tempo: 'Ver pasos'
                },
                 {
                    name: 'PNF Contraer-Relajar (CR) Sóleo (Rodilla Doblada)',
                    instructions: ['1. Estira suave 10s (rodilla doblada, talón abajo).', '2. CONTRAER isométrico (empuja punta pie vs suelo) 6-8s (50-70% esfuerzo).', '3. RELAJAR 2-3s.', '4. ESTIRAR flexionando más tobillo/rodilla suavemente a nuevo rango 15-20s.'],
                    sets: '2-3 ciclos', reps: 'por pierna', rest: '30 seg', tempo: 'Ver pasos'
                },
                {
                    name: 'Elev. Talón Unipodal Pesada (Rodilla Recta)',
                    instructions: ['De pie en una pierna, idealmente en escalón.', 'Puedes añadir peso (mancuerna/mochila).', 'Máximo rango posible.', 'Controla el movimiento, sobre todo la bajada.'],
                    sets: '3', reps: '6-10 (RPE 8-9 / RIR 1-2)', rest: '90-120 seg', tempo: '2 / 1 / 3-4'
                },
                 {
                    name: 'Elev. Talón Sentado Pesada',
                    instructions: ['En máquina o con peso sobre rodillas (~90° flexión).', 'Máximo rango.'],
                    sets: '3', reps: '8-12 (difícil)', rest: '90 seg', tempo: '2 / 1 / 3'
                },
                 {
                    name: 'Pogos (Saltos tobillo)',
                    instructions: ['Rodillas casi rectas.', 'Salta vertical usando principalmente el tobillo.', 'Minimiza tiempo de contacto.', 'Empieza bajo, busca reactividad, no altura máxima aún.', 'Detener si hay dolor agudo en rodilla o Aquiles.'],
                    sets: '3', reps: '15-20 saltos (o 15 seg)', rest: '60-90 seg', tempo: 'Reactivo/Rápido'
                }
            ]
        },
        'day-3': { // Rodilla HSR
            type: 'Rodilla HSR',
            exercises: [ /* Referencia a Día 1 */
                 { name: 'Calentamiento', instructions: '5 minutos de cardio ligero.', sets: 'N/A', reps: '5 min', rest: 'N/A', tempo: 'N/A'},
                 { name: 'Sentadilla con Talones Elevados (Peso Corporal)', instructions: ['Como Día 1.'], sets: '3', reps: '10', rest: '2 minutos', tempo: '3 / 1 / 3'}
            ]
        },
        'day-4': { // Tobillo/Pantorrilla Avanzado
            type: 'Tobillo/Pantorrilla',
            exercises: [ /* Referencia a Día 2 */
                { name: 'Movilización Tobillo Rodilla a Pared', instructions: ['Calentamiento.'], sets: '2', reps: '15 por pierna', rest: 'Alternar', tempo: 'Controlado'},
                { name: 'PNF CR Gemelo (Rodilla Recta)', instructions: ['Contraer-Relajar-Estirar.'], sets: '2-3 ciclos', reps: 'por pierna', rest: '30 seg', tempo: 'Ver pasos'},
                { name: 'PNF CR Sóleo (Rodilla Doblada)', instructions: ['Contraer-Relajar-Estirar.'], sets: '2-3 ciclos', reps: 'por pierna', rest: '30 seg', tempo: 'Ver pasos'},
                { name: 'Elev. Talón Unipodal Pesada (Rodilla Recta)', instructions: ['Como Día 2.'], sets: '3', reps: '6-10 (RPE 8-9)', rest: '90-120 seg', tempo: '2 / 1 / 3-4'},
                { name: 'Elev. Talón Sentado Pesada', instructions: ['Como Día 2.'], sets: '3', reps: '8-12', rest: '90 seg', tempo: '2 / 1 / 3'},
                { name: 'Pogos (Saltos tobillo)', instructions: ['Como Día 2.'], sets: '3', reps: '15-20 saltos', rest: '60-90 seg', tempo: 'Reactivo'}
            ]
        },
        'day-5': { // Rodilla HSR
            type: 'Rodilla HSR',
             exercises: [ /* Referencia a Día 1 */
                 { name: 'Calentamiento', instructions: '5 minutos de cardio ligero.', sets: 'N/A', reps: '5 min', rest: 'N/A', tempo: 'N/A'},
                 { name: 'Sentadilla con Talones Elevados (Peso Corporal)', instructions: ['Como Día 1.'], sets: '3', reps: '10', rest: '2 minutos', tempo: '3 / 1 / 3'}
             ]
        },
        'day-6': { // Tobillo/Pantorrilla Avanzado
            type: 'Tobillo/Pantorrilla',
             exercises: [ /* Referencia a Día 2 */
                { name: 'Movilización Tobillo Rodilla a Pared', instructions: ['Calentamiento.'], sets: '2', reps: '15 por pierna', rest: 'Alternar', tempo: 'Controlado'},
                { name: 'PNF CR Gemelo (Rodilla Recta)', instructions: ['Contraer-Relajar-Estirar.'], sets: '2-3 ciclos', reps: 'por pierna', rest: '30 seg', tempo: 'Ver pasos'},
                { name: 'PNF CR Sóleo (Rodilla Doblada)', instructions: ['Contraer-Relajar-Estirar.'], sets: '2-3 ciclos', reps: 'por pierna', rest: '30 seg', tempo: 'Ver pasos'},
                { name: 'Elev. Talón Unipodal Pesada (Rodilla Recta)', instructions: ['Como Día 2.'], sets: '3', reps: '6-10 (RPE 8-9)', rest: '90-120 seg', tempo: '2 / 1 / 3-4'},
                { name: 'Elev. Talón Sentado Pesada', instructions: ['Como Día 2.'], sets: '3', reps: '8-12', rest: '90 seg', tempo: '2 / 1 / 3'},
                { name: 'Pogos (Saltos tobillo)', instructions: ['Como Día 2.'], sets: '3', reps: '15-20 saltos', rest: '60-90 seg', tempo: 'Reactivo'}
            ]
        },
        'day-7': { // Descanso
            type: 'Descanso',
            exercises: [
                {
                    name: 'Descanso Completo o Activo Ligero',
                    instructions: 'Descanso total o una caminata muy suave. Permite la recuperación completa.',
                    sets: 'N/A', reps: 'N/A', rest: 'N/A', tempo: 'N/A'
                }
            ]
        }
    };

    // --- Lógica para Mostrar Ejercicios (sin cambios respecto al JS anterior) ---
    function displayExercises(dayId) {
        exerciseDisplay.innerHTML = ''; // Limpiar vista previa
        const dayData = weekRoutine[dayId];

        if (!dayData || !dayData.exercises || dayData.exercises.length === 0) {
            exerciseDisplay.innerHTML = '<p>No hay ejercicios programados para este día.</p>';
            return;
        }

         // Añadir Título del Día
        const dayTitle = document.createElement('h2');
        dayTitle.textContent = `Día ${dayId.split('-')[1]}: ${dayData.type}`;
        dayTitle.style.textAlign = 'center'; // Centrar título del día
        dayTitle.style.marginBottom = '15px'; // Espacio debajo del título
        exerciseDisplay.appendChild(dayTitle);


        dayData.exercises.forEach((exercise, index) => {
            const exerciseItem = document.createElement('div');
            exerciseItem.classList.add('exercise-item');
            exerciseItem.dataset.exerciseIndex = index;

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('exercise-details');

            const name = document.createElement('h3');
            name.textContent = exercise.name;
            detailsDiv.appendChild(name);

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
            // Ocultar N/A para calentamiento/descanso
             if (exercise.sets !== 'N/A') {
                detailsDiv.appendChild(params);
            }


            exerciseItem.appendChild(detailsDiv);

            const completeBtn = document.createElement('button');
            completeBtn.classList.add('complete-btn');
            completeBtn.textContent = '✓ Completar';
            completeBtn.addEventListener('click', () => {
                exerciseItem.classList.toggle('completed');
                 if (exerciseItem.classList.contains('completed')) {
                    completeBtn.textContent = '✓ Completo';
                } else {
                    completeBtn.textContent = '✓ Completar';
                }
            });

            if (exercise.sets !== 'N/A') { // No añadir botón si no hay series definidas (calentamiento/descanso)
                exerciseItem.appendChild(completeBtn);
            }

            exerciseDisplay.appendChild(exerciseItem);
        });
    }

    // --- Añadir Event Listeners a los Botones de Día (sin cambios) ---
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            dayButtons.forEach(btn => btn.classList.remove('active-day'));
            button.classList.add('active-day');
            displayExercises(button.id);
        });
    });

     // --- Carga Inicial (sin cambios) ---
    const initialDay = 'day-1';
    const initialButton = document.getElementById(initialDay);
    if (initialButton) {
        initialButton.classList.add('active-day');
        displayExercises(initialDay);
    } else {
         exerciseDisplay.innerHTML = '<p>Error al cargar la rutina inicial.</p>';
    }
});
