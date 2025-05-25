import { useState, useEffect } from 'react'

function App() {
  const [formData, setFormData] = useState({
    productName: '',
    size: '',
    email: ''
  })
  const [showDeals, setShowDeals] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Load Omni script & initialize
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.omnidimension.ai/omni-voice.min.js'
    script.async = true
    script.onload = () => {
      if (window.OmniVoice) {
        window.OmniVoice.init({
          apiKey: import.meta.env.VITE_OMNI_API_KEY,
          agentId: import.meta.env.VITE_OMNI_AGENT_ID
        })
      }
    }
    document.body.appendChild(script)
  }, [])

  const deals = [
    { seller: 'SneakerHub', price: 250, delivery: 3 },
    { seller: 'KickZone', price: 260, delivery: 2 },
    { seller: 'ShoeResell', price: 265, delivery: 4 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const startVoiceAgent = (data) => {
    if (window.OmniVoice) {
      window.OmniVoice.start({
        metadata: {
          productName: data.productName,
          size: data.size,
          email: data.email
        }
      })
    } else {
      console.error('❌ OmniVoice not loaded yet.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowDeals(true)
    startVoiceAgent(formData)
  }

  return (
    <div className="min-h-screen transition-all duration-700 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-black flex items-center justify-center px-4 py-12 font-sans">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 rounded-full text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white shadow hover:scale-105 transition"
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="w-full max-w-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl transition-all duration-700 border dark:border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-8">
          👟 Sneaker Deals Agent
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            required
          />
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            placeholder="Size"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            🎙️ Start Voice Agent
          </button>
        </form>

        {showDeals && (
          <>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                🔥 Top Sneaker Deals
              </h2>
              <div className="space-y-4">
                {deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow hover:shadow-md transition"
                  >
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Seller: {deal.seller}</p>
                    <p className="text-gray-700 dark:text-gray-200">Price: ${deal.price}</p>
                    <p className="text-gray-700 dark:text-gray-200">Delivery: {deal.delivery} days</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-green-600 dark:text-green-400 font-medium text-center animate-pulse">
              ✅ Email sent with the best deals! Logged successfully.
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
