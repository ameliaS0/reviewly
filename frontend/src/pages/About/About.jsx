import './About.css'
import pfp from '../../assets/pfp_cosmos.jpg'

/*page a propos de moi simple */
export default function About() {
  return (
    <div className="about-page">
      <h1 className="display about-title">À propos de moi</h1>

      <div className="about-profile">
        <div className="about-photo">
          <img src={pfp} alt="Photo de profil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="about-profile-info">
          <h2 className="about-name">Saliev Amélia</h2>
          <p className="about-role">Développeuse Full Stack | Apprentie Data Scientist</p>
          <p className="about-bio">Passionné par l'intelligence artificielle et le développement web, je fais le lien entre les connaissances issues des données et leurs applications pratiques. En tant que stagiaire et étudiant développeur, je mets à profit mes compétences en ML/DL et en développement full-stack pour résoudre des problèmes concrets.</p>
        </div>
      </div>

      <div className="divider" />

      <div className="about-skills">
        <p className="about-section-title">Stack technique</p>
        <div className="about-skills-list">
          {['React', 'Python', 'Flask', 'PostgreSQL', 'Hugging Face', 'SQLAlchemy', 'Tailwind CSS', 'REST API', 'GIT', 'Docker', 'R', 'Django', 'Linux'].map(skill => (
            <span key={skill} className="tag" style={{ padding: '6px 12px', fontSize: '12px' }}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div>
        <p className="about-section-title">Ce projet</p>
        <p className="about-project">
          Reviewly est une application web qui centralise les avis clients,
          analyse automatiquement leur sentiment grâce à l'intelligence artificielle,
          et génère des recommandations d'amélioration basées sur les retours négatifs récurrents.
        </p>
      </div>
    </div>
  )
}