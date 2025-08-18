const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-inner">
      <div className="container mx-auto px-6 py-2 mb-0 ">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          
          {/* Column 1: MyTask Brand Info */}
          <div >
            <h4 className="font-bold text-xl text-[#1E2A78] mb-3">MyTask</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Stay organized and manage your tasks efficiently with MyTask. </p> 
              <p className="text-sm text-gray-700 leading-relaxed">Create, track,
                 and complete tasks seamlessly.</p> 
           
          </div>

          {/* Column 2: Grouped Links (Quick Links + Resources) */}
          <div className="grid grid-cols-2 gap-6 justify">
            {/* Quick Links */}
            <div>
              <h5 className="font-semibold text-lg text-[#1E2A78] mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#dashboard" className="hover:text-blue-600 transition">Dashboard</a></li>
                <li><a href="#tasks" className="hover:text-blue-600 transition">My Tasks</a></li>
                <li><a href="#calendar" className="hover:text-blue-600 transition">Calendar</a></li>
                <li><a href="#settings" className="hover:text-blue-600 transition">Settings</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h5 className="font-semibold text-lg text-[#1E2A78] mb-3">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-blue-600 transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
                <li><a href="#privacy" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-blue-600 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Centered Copyright */}
        <div className="mt-3 mb-0 border-t border-gray-100 pt-4 text-center">
          <p className=" text-xs text-[#1E2A78]">
            &copy; {new Date().getFullYear()} MyTask. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
