const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="text-center py-3">&copy; {year} Pokemon App. All rights reserved.</footer>
    )
}

export default Footer