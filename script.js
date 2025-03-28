document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const daySelector = document.getElementById('day-selector');
    const exerciseDisplay = document.getElementById('exercise-display');
    const dayButtons = document.querySelectorAll('.day-btn');
    const toggleUpdateBtn = document.getElementById('toggle-update-btn');
    const updateSection = document.getElementById('update-section');
    const routineJsonInput = document.getElementById('routine-json-input');
    const saveRoutineBtn = document.getElementById('save-routine-btn');
    const saveFeedback = document.getElementById('save-feedback');

    // --- Clave para LocalStorage ---
    const STORAGE_KEY = 'tendonRoutineData';

    // --- Variable para la rutina actual en memoria ---
    let currentWeekRoutine = {};
    let currentlySelectedDayId = 'day-1'; // Para saber qué día refrescar

    // --- Rutina por Defecto (La última que definimos - Avanzada) ---
    const defaultWeekRoutine = {
        'day-1': { "type": "Rodilla HSR", "exercises": [{ "name": "Calentamiento", "instructions": "5 minutos de cardio ligero (bici, caminar).", "sets": "N/A", "reps": "5 min", "rest": "N/A", "tempo": "N/A"}, { "name": "Sentadilla con Talones Elevados (Peso Corporal)", "instructions": ["Coloca talones en disco/libro (2-5 cm).", "Tronco erguido.", "Baja en 3 seg.", "Pausa 1 seg abajo.", "Sube en 3 seg.", "Dolor tolerable (≤ 4-5/10)."], "sets": "3", "reps": "10", "rest": "2 minutos", "tempo": "3 / 1 / 3"}] },
        'day-2': { "type": "Tobillo/Pantorrilla", "exercises": [{ "name": "Movilización Tobillo Rodilla a Pared", "instructions": ["Calentamiento dinámico.", "Talón siempre en el suelo."], "sets": "2", "reps": "15 por pierna", "rest": "Alternar", "tempo": "Controlado"}, { "name": "PNF CR Gemelo (Rodilla Recta)", "instructions": ["1. Estira suave 10s.", "2. CONTRAER isométrico (empuja punta pie vs suelo) 6-8s (50-70% esfuerzo).", "3. RELAJAR 2-3s.", "4. ESTIRAR suavemente a nuevo rango 15-20s."], "sets": "2-3 ciclos", "reps": "por pierna", "rest": "30 seg", "tempo": "Ver pasos"}, { "name": "PNF CR Sóleo (Rodilla Doblada)", "instructions": ["1. Estira suave 10s (rodilla doblada, talón abajo).", "2. CONTRAER isométrico (empuja punta pie vs suelo) 6-8s (50-70% esfuerzo).", "3. RELAJAR 2-3s.", "4. ESTIRAR flexionando más tobillo/rodilla suavemente a nuevo rango 15-20s."], "sets": "2-3 ciclos", "reps": "por pierna", "rest": "30 seg", "tempo": "Ver pasos"}, { "name": "Elev. Talón Unipodal Pesada (Rodilla Recta)", "instructions": ["De pie en una pierna, idealmente en escalón.", "Puedes añadir peso (mancuerna/mochila).", "Máximo rango posible.", "Controla el movimiento, sobre todo la bajada."], "sets": "3", "reps": "6-10 (RPE 8-9 / RIR 1-2)", "rest": "90-120 seg", "tempo": "2 / 1 / 3-4"}, { "name": "Elev. Talón Sentado Pesada", "instructions": ["En máquina o con peso sobre rodillas (~90° flexión).", "Máximo rango."], "sets": "3", "reps": "8-12 (difícil)", "rest": "90 seg", "tempo": "2 / 1 / 3"}, { "name": "Pogos (Saltos tobillo)", "instructions": ["Rodillas casi rectas.", "Salta vertical usando principalmente el tobillo.", "Minimiza tiempo de contacto.", "Empieza bajo, busca reactividad, no altura máxima aún.", "Detener si hay dolor agudo en rodilla o Aquiles."], "sets": "3", "reps": "15-20 saltos (o 15 seg)", "rest": "60-90 seg", "tempo": "Reactivo/Rápido"}] },
        'day-3': { "type": "Rodilla HSR", "exercises": [{ "name": "Calentamiento", "instructions": "5 min cardio ligero.", "sets": "N/A", "reps": "5 min", "rest": "N/A", "tempo": "N/A"}, { "name": "Sentadilla con Talones Elevados (Peso Corporal)", "instructions": ["Como Día 1."], "sets": "3", "reps": "10", "rest": "2 minutos", "tempo": "3 / 1 / 3"}] },
        'day-4': { "type": "Tobillo/Pantorrilla", "exercises": [{ "name": "Movilización Tobillo Rodilla a Pared", "instructions": ["Calentamiento."], "sets": "2", "reps": "15 por pierna", "rest": "Alternar", "tempo": "Controlado"}, { "name": "PNF CR Gemelo (Rodilla Recta)", "instructions": ["Contraer-Relajar-Estirar."], "sets": "2-3 ciclos", "reps": "por pierna", "rest": "30 seg", "tempo": "Ver pasos"}, { "name": "PNF CR Sóleo (Rodilla Doblada)", "instructions": ["Contraer-Relajar-Estirar."], "sets": "2-3 ciclos", "reps": "por pierna", "rest": "30 seg", "tempo": "Ver pasos"}, { "name": "Elev. Talón Unipodal Pesada (Rodilla Recta)", "instructions": ["Como Día 2."], "sets": "3", "reps": "6-10 (RPE 8-9)", "rest": "90-120 seg", "tempo": "2 / 1 / 3-4"}, { "name": "Elev. Talón Sentado Pesada", "instructions": ["Como Día 2."], "sets": "3", "reps": "8-12", "rest": "90 seg", "tempo": "2 / 1 / 3"}, { "name": "Pogos (Saltos tobillo)", "instructions": ["Como Día 2."], "sets": "3", "reps": "15-20 saltos", "rest": "60-90 seg", "tempo": "Reactivo"}] },
        'day-5': { "type": "Rodilla HSR", "exercises": [{ "name": "Calentamiento", "instructions": "5 min cardio ligero.", "sets": "N/A", "reps": "5 min", "rest": "N/A", "tempo": "N/A"}, { "name": "Sentadilla con Talones Elevados (Peso Corporal)", "instructions": ["Como Día 1."], "sets": "3", "reps": "10", "rest": "2 minutos", "tempo": "3 / 1 / 3"}] },
        'day-6': { "type": "Tobillo/Pantorrilla", "exercises": [{ "name": "Movilización Tobillo Rodilla a Pared", "instructions": ["Calentamiento."], "sets": "2", "reps": "15 por pierna", "rest": "Alternar", "tempo": "Controlado"}, { "name": "PNF CR Gemelo (Rodilla Recta)", "instructions": ["Contraer-Relajar-Estirar."], "sets": "2-3 ciclos", "reps": "por pierna", "rest": "30 seg", "tempo": "Ver pasos"}, { "name": "PNF CR Sóleo (Rodilla Doblada)", "instructions": ["Contraer-Relajar-Estirar."], "sets": "2-3 ciclos", "reps": "por pierna", "rest": "30 seg", "tempo": "Ver pasos"}, { "name": "Elev. Talón Unipodal Pesada (Rodilla Recta)", "instructions": ["Como Día 2."], "sets": "3", "reps": "6-10 (RPE 8-9)", "rest": "90-120 seg", "tempo": "2 / 1 / 3-4"}, { "name": "Elev. Talón Sentado Pesada", "instructions": ["Como Día 2."], "sets": "3", "reps": "8-12", "rest": "90 seg", "tempo": "2 / 1 / 3"}, { "name": "Pogos (Saltos tobillo)", "instructions": ["Como Día 2."], "sets": "3", "reps": "15-20 saltos", "rest": "60-90 seg", "tempo": "Reactivo"}] },
        'day-7': { "type": "Descanso", "exercises": [{ "name": "Descanso Completo o Activo Ligero", "instructions": "Descanso total o caminata suave.", "sets": "N/A", "reps": "N/A", "rest": "N/A", "tempo": "N/A"}] }
    };

    // --- Función para Cargar Rutina desde LocalStorage (o usar default) ---
    function loadRoutine() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            try {
                currentWeekRoutine = JSON.parse(storedData);
                console.log("Rutina cargada desde LocalStorage.");
            } catch (e) {
                console.error("Error al parsear rutina de LocalStorage, usando default:", e);
                currentWeekRoutine = defaultWeekRoutine;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWeekRoutine)); // Guardar la default si la guardada estaba corrupta
            }
        } else {
            console.log("No se encontró rutina en LocalStorage, usando y guardando default.");
            currentWeekRoutine = defaultWeekRoutine;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWeekRoutine));
        }
        updateDayButtonLabels();
        displayExercises(currentlySelectedDayId);
    }

     // --- Función para Actualizar Nombres de Botones ---
     function updateDayButtonLabels() {
        dayButtons.forEach(button => {
            const dayId = button.id;
            if (currentWeekRoutine[dayId] && currentWeekRoutine[dayId].type) {
                button.textContent = `Día ${dayId.split('-')[1]} (${currentWeekRoutine[dayId].type})`;
            } else {
                button.textContent = `Día ${dayId.split('-')[1]}`;
            }
        });
    }


    // --- Función para Guardar Rutina en LocalStorage ---
    function saveRoutine() {
        const jsonInput = routineJsonInput.value.trim();
        if (!jsonInput) {
            showFeedback("El área de texto está vacía.", true);
            return;
        }

        try {
            const newRoutineObject = JSON.parse(jsonInput);

            if (typeof newRoutineObject !== 'object' || newRoutineObject === null || !newRoutineObject['day-1']) {
                 throw new Error("El formato JSON no parece una rutina válida (falta 'day-1' o no es un objeto).");
            }

            localStorage.setItem(STORAGE_KEY, jsonInput); // Guarda la cadena original
            currentWeekRoutine = newRoutineObject; // Actualiza la variable global

            updateDayButtonLabels();
            displayExercises(currentlySelectedDayId); // Refresca la vista actual

            showFeedback("¡Rutina guardada y actualizada!", false);
            routineJsonInput.value = '';
            updateSection.classList.add('hidden');

        } catch (e) {
            console.error("Error al guardar/parsear rutina:", e);
            showFeedback(`Error: ${e.message}. Revisa el formato JSON.`, true);
        }
    }

    // --- Función para Mostrar Feedback (éxito/error) ---
    function showFeedback(message, isError) {
        saveFeedback.textContent = message;
        saveFeedback.className = isError ? 'feedback-error' : 'feedback-success';
        setTimeout(() => {
            saveFeedback.textContent = '';
            saveFeedback.className = '';
        }, 5000);
    }

    // --- Lógica para Mostrar Ejercicios (Usa currentWeekRoutine) ---
    function displayExercises(dayId) {
        currentlySelectedDayId = dayId;
        exerciseDisplay.innerHTML = '';
        const dayData = currentWeekRoutine[dayId];

        if (!dayData || !dayData.exercises || dayData.exercises.length === 0) {
            exerciseDisplay.innerHTML = '<p>No hay ejercicios programados para este día.</p>';
            return;
        }

        const dayTitle = document.createElement('h2');
        dayTitle.textContent = `Día ${dayId.split('-')[1]}${dayData.type ? ': ' + dayData.type : ''}`;
        dayTitle.style.textAlign = 'center';
        dayTitle.style.marginBottom = '15px';
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
                    li.innerHTML = step; // Usa innerHTML para permitir formato básico si es necesario
                    instructionsList.appendChild(li);
                });
                detailsDiv.appendChild(instructionsList);
            } else if (exercise.instructions) {
                 const instructions = document.createElement('p');
                 instructions.innerHTML = `<strong>Instrucciones:</strong> ${exercise.instructions}`;
                 detailsDiv.appendChild(instructions);
            }

            const params = document.createElement('p');
            let paramsText = '';
            if(exercise.sets) paramsText += `<strong>Series:</strong> ${exercise.sets}`;
            if(exercise.reps) paramsText += ` | <strong>Reps/Tiempo:</strong> ${exercise.reps}`;
            if(exercise.rest) paramsText += ` | <strong>Descanso:</strong> ${exercise.rest}`;
            if(exercise.tempo) paramsText += ` | <strong>Tempo:</strong> ${exercise.tempo}`;

            if (paramsText && exercise.sets !== 'N/A') {
                 params.innerHTML = paramsText;
                 detailsDiv.appendChild(params);
            }

            exerciseItem.appendChild(detailsDiv);

            if (exercise.sets !== 'N/A') {
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
                exerciseItem.appendChild(completeBtn);
             }

            exerciseDisplay.appendChild(exerciseItem);
        });
    }

    // --- Event Listeners ---
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            dayButtons.forEach(btn => btn.classList.remove('active-day'));
            button.classList.add('active-day');
            displayExercises(button.id);
        });
    });

    toggleUpdateBtn.addEventListener('click', () => {
        updateSection.classList.toggle('hidden');
        saveFeedback.textContent = '';
        saveFeedback.className = '';
    });

    saveRoutineBtn.addEventListener('click', saveRoutine);

    // --- Carga Inicial de la Rutina ---
    loadRoutine();

    // Seleccionar Día 1 visualmente en la carga
     const initialButton = document.getElementById(currentlySelectedDayId);
     if (initialButton) {
        dayButtons.forEach(btn => btn.classList.remove('active-day'));
        initialButton.classList.add('active-day');
     }
});
