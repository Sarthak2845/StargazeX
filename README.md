# 🌌 StargazeX

[![Netlify Status](https://api.netlify.com/api/v1/badges/31da827e-e217-4ab9-a2c4-8856a23a612b/deploy-status)](https://app.netlify.com/projects/stargazex/deploys)
![GitHub last commit](https://img.shields.io/github/last-commit/Sarthak2845/StargazeX?color=brightgreen&logo=github)
![GitHub Repo stars](https://img.shields.io/github/stars/Sarthak2845/StargazeX?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/Sarthak2845/StargazeX)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fstargazex.netlify.app)

**The Ultimate Community Platform for Astronomy Enthusiasts**  
Live at: [https://stargazex.netlify.app/](https://stargazex.netlify.app/)

StargazeX is a modern web platform that unites stargazers, telescope owners, and science lovers. Whether you're a beginner searching for your first glimpse of Saturn's rings, or a seasoned astronomer ready to share equipment and knowledge, StargazeX provides the tools to connect, learn, and explore the cosmos together.

---

## 🚀 Features

- **Telescope Sharing Network**
  - Register your telescope and share it with others.
  - Browse telescopes available in your area for community stargazing.
  - Manage your own telescopes and sharing preferences.

- **Solar Flare Predictions**
  - Real-time solar flare forecasts powered by AI.
  - Input your location or coordinates for targeted alerts.

- **User Profiles**
  - Secure authentication with Firebase.
  - Manage your profile, telescopes, and personalized stargazing experience.

- **Community Events** *(Planned)*
  - Organize, join, and track local stargazing events.

- **Astronomy News** *(Planned)*
  - Stay up-to-date with the latest discoveries, celestial events, and astronomy articles.

---

## 🛰️ How It Works

### Telescope Sharing

- **For Telescope Owners:**  
  Register your equipment, set its availability, and support a community of sky explorers.
- **For Stargazers:**  
  Find telescopes in your region and connect with owners for unique stargazing sessions or rentals.

### Solar Flare Forecast

- Access a dedicated section for solar activity.
- View AI-based predictions to plan your observations and protect sensitive equipment.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express (API endpoints for telescope registry, user auth, solar flare predictions, etc.)
- **Database:** Firebase (Authentication, Firestore for data storage)
- **AI/ML:** Solar flare prediction model (integrated via backend)
- **APIs:** Custom and third-party APIs for astronomy data and news

---

## 🎯 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Firebase project and credentials

### Installation

```bash
git clone https://github.com/Sarthak2845/StargazeX.git
cd StargazeX
npm install
```

### Environment Variables

Set up your `.env` file for backend services and Firebase credentials as required.

### Run Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## ✨ Sample User Flows

- **Register and log in with your email.**
- **List your telescope:**  
  Fill out the simple form (name, location, type, model, contact info).
- **Discover telescopes:**  
  Browse all available telescopes and connect with owners.
- **Solar flare forecast:**  
  Get predictions for your region and see detailed solar activity info.
- **View and update your profile.**

---

## 📦 Project Structure

```
src/
  components/
    telescope/        # Telescope sharing UI
    UserProfile.jsx   # User profile dashboard
    firebase.js       # Firebase setup
  pages/
    Home.jsx          # Landing page
    Telescope.jsx     # Main telescope sharing & registry
    SolarFlare.jsx    # Solar flare predictions
  ...
```

---

## 💡 Why StargazeX?

- Lowers the barrier to entry for astronomy by connecting people and sharing resources.
- Fosters a collaborative, science-loving community.
- Offers a beautiful, modern UI with real-time features.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests with your ideas, bug reports, or improvements.

---

## 🪐 License

MIT License

---

> StargazeX: Because the sky belongs to everyone.
