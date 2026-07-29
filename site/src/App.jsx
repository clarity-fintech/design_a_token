import BackgroundMesh from "./components/BackgroundMesh.jsx";
import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import LiveMeshStrip from "./components/LiveMeshStrip.jsx";
import AssetMarquee from "./components/AssetMarquee.jsx";
import StatsShowcase from "./components/StatsShowcase.jsx";
import Thesis from "./components/Thesis.jsx";
import ExtensionSlideshow from "./components/ExtensionSlideshow.jsx";
import MisPlayground from "./components/MisPlayground.jsx";
import SdkSection from "./components/SdkSection.jsx";
import WalkthroughSection from "./components/WalkthroughSection.jsx";
import DeveloperDocs from "./components/DeveloperDocs.jsx";
import CategoriesTable from "./components/CategoriesTable.jsx";
import NanoTaskStrip from "./components/NanoTaskStrip.jsx";
import LaunchCTA from "./components/LaunchCTA.jsx";
import LegalSection from "./components/LegalSection.jsx";
import Clrty1RoutingPanel from "./components/Clrty1RoutingPanel.jsx";
import ConnectMesh from "./components/ConnectMesh.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-clarity-bg font-sans text-clarity-text">
      <BackgroundMesh />
      <SiteNav />
      <main>
        <Hero />
        <LiveMeshStrip />
        <Clrty1RoutingPanel />
        <AssetMarquee />
        <StatsShowcase />
        <Thesis />
        <ExtensionSlideshow />
        <MisPlayground />
        <SdkSection />
        <WalkthroughSection />
        <DeveloperDocs />
        <CategoriesTable />
        <NanoTaskStrip />
        <LaunchCTA />
        <LegalSection />
        <ConnectMesh />
      </main>
      <Footer />
    </div>
  );
}
