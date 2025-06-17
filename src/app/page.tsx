import Link from "next/link";
import fs from "fs";
import toml from "toml";
import path from "path";

// Define the structure for navigation items
interface NavItem {
  name: string;
  url: string;
}

// Function to read and parse navigation.toml
async function getNavigationData(): Promise<NavItem[]> {
  // Adjust path to go up one directory to access website_config
  const filePath = path.join(process.cwd(), '..', 'website_config', 'navigation.toml');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = toml.parse(fileContent);
  return data.main_nav || [];
}

export default async function Home() {
  const navigationItems = await getNavigationData();

  return (
    <>
      <header>
        <nav>
          <div className="logo">Mycelial FunGuy</div>
          <ul>
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link href={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <h1>Explore the World of Fungi</h1>
          <p>Unveiling the mysteries of mushrooms, from cultivation to consumption.</p>
          <button className="cta-button">Discover More</button>
        </section>

        <section className="content-cards">
          <h2>Our Latest Insights</h2>
          <div className="card-container">
            <div className="card">
              <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" />
              <h3>Article Title 1</h3>
              <p>Brief description of the article content...</p>
              <a href="#" className="read-more">Read More</a>
            </div>
            <div className="card">
              <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" />
              <h3>Guide Title 1</h3>
              <p>Brief description of the guide content...</p>
              <a href="#" className="read-more">View Guide</a>
            </div>
            <div className="card">
              <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" />
              <h3>Product Name 1</h3>
              <p>Brief description of the product...</p>
              <a href="#" className="read-more">View Product</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Mycelial FunGuy. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </>
  );
}
