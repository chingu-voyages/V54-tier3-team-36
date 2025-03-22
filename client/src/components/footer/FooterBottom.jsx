function FooterBottom() {
  return (
    <div className="w-full flex flex-col sm:items-center items-start justify-between dark:bg-gray-900 dark:text-white py-10 px-8">
      {/* GitHub Link */}
      <div className="flex items-center justify-center text-sm text-footerBoxColor mb-4">
        <i className="fab fa-github text-4xl mr-4 text-gray-400 dark:text-white" />
        <a
          href="https://github.com/chingu-voyages/V54-tier3-team-36"
          target="_blank"
          className="text-lg text-gray-400 hover:text-emerald-400 dark:text-white dark:hover:text-emerald-400">
          Github Project Link - February 2025
        </a>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-gray-400 mt-4 sm:mt-0">
        Disclaimer: This website and its associated services are provided for
        demonstrative and educational purposes only.
      </div>
    </div>
  );
}

export default FooterBottom;
