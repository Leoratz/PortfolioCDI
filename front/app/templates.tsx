
import Footer  from "@/components/Footer"
import Menu from "@/components/Menu"
export default function RootTemplate({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
               <Menu />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}