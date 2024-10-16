import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama3.1',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})

function ChatBot() {
    return (
        <p>{response}</p>
    )
}

export default ChatBot;