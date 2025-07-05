document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const conversationItems = document.querySelectorAll('.conversation-item');

    // --- Funcionalidad 1: Enviar y Mostrar Mensajes ---
    const sendMessage = () => {
        const messageText = chatInput.value.trim();

        if (messageText) {
            // Crear el elemento del mensaje saliente
            const outgoingMessageDiv = document.createElement('div');
            outgoingMessageDiv.classList.add('message', 'outgoing');
            outgoingMessageDiv.innerHTML = `<p>${messageText}</p>`;
            // Opcional: añadir avatar pequeño del usuario si lo deseas
            // outgoingMessageDiv.innerHTML = `<p>${messageText}</p><div class="avatar-small"><img src="tu-avatar-usuario.png" alt="Tú"></div>`;

            chatMessages.appendChild(outgoingMessageDiv);
            chatInput.value = ''; // Limpiar el input

            // Desplazamiento automático al final del chat
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simular respuesta del agente (funcionalidad 3)
            simulateAgentResponse(messageText);
        }
    };

    // Evento para el botón de enviar
    sendButton.addEventListener('click', sendMessage);

    // Evento para la tecla Enter en el input
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- Funcionalidad 3 (Simulación): Respuesta del Agente ---
    const simulateAgentResponse = (userMessage) => {
        setTimeout(() => {
            const agentResponseDiv = document.createElement('div');
            agentResponseDiv.classList.add('message', 'incoming');
            let responseText = "Gracias por tu mensaje. Tu reporte ha sido generado";

          
            if (userMessage.toLowerCase().includes("hola")) {
                responseText = "¡Hola! ¿En qué puedo ayudarte hoy?";
            } else if (userMessage.toLowerCase().includes("conexión")) {
                responseText = "Entiendo, te ayudaremos con tu conexión a internet. ¿Podrías darme tu número de cedula?";
            } else if (userMessage.toLowerCase().includes("gracias")) {
                responseText = "De nada. ¡Estamos para servirte!";
            }

            agentResponseDiv.innerHTML = `<p>${responseText}</p>`;
            chatMessages.appendChild(agentResponseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; 
        }, 1500); // Retraso de 1.5 segundos
    };

    // --- Funcionalidad 2: Seleccionar Conversaciones ---
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remover la clase 'active' de todas las conversaciones
            conversationItems.forEach(conv => conv.classList.remove('active'));
            // Añadir la clase 'active' al item clicado
            item.classList.add('active');

            //Cargar el historial de mensajes de esta conversación
            //Por ahora, solo se vacia el chat para simular un nuevo chat
            chatMessages.innerHTML = '';
            
            // Opcional: añadir un mensaje de bienvenida al nuevo chat
            const welcomeMessage = document.createElement('div');
            welcomeMessage.classList.add('message', 'incoming');
            const agentName = item.querySelector('.name').textContent;
            welcomeMessage.innerHTML = `<p>Hola, estás hablando con ${agentName}. ¿En qué podemos ayudarte?</p>`;
            chatMessages.appendChild(welcomeMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });

    // Opcional: Activar la primera conversación al cargar
    if (conversationItems.length > 0) {
        conversationItems[0].click(); // Simula un clic en la primera conversación
    }

    
});