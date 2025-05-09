function Footer() {
    return (
        <footer className="rounded-md shadow bg-slate-700">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm  sm:text-center text-gray-400">© {new Date().getFullYear()} <a href="https://chessv.netlify.app/" className="hover:underline">ChessV</a> All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                <li>
                    <a href="https://linkedin.com/in/uditdev" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="https://github.com/uditdev1" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="https://github.com/uditdev1/Ratsi-Ai" className="hover:underline me-4 md:me-6">Project Repository</a>
                </li>
            </ul>
            </div>
        </footer>
    )
}

export default Footer
