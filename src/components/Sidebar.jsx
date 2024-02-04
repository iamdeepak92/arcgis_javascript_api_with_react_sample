// Functional component for the Sidebar
const Sidebar = () => {
  return (
    // Container for the sidebar with two split sections
    <div className="sidebar-container">
      {/* Table of Index (TOC) section */}
      <div className="split-sidebar  toc">
        <h4>Table of Index</h4>
        <div id="toc"></div>
      </div>

      {/* Drawing section with sketch area */}
      <div className="split-sidebar drawing">
        <h4>Drawing</h4>
        <div id="sketch"></div>
      </div>
    </div>
  );
};

// Exporting the Sidebar component
export default Sidebar;
