import Filter from "../components/Filter"
import Header from "../components/Header"
import Posts from "../components/Posts"

function Homepage() {
    return (
        <div>
            <Header />
            <section className="space-y-3">
                <div>
                    <hr className="text-neutral-200"/>
                    <h3 className="uppercase text-center tracking-widest mt-10 font-bold">Explore trending topics</h3>
                    <Filter />
                </div>
                <Posts />
            </section>
        </div>
    )
}

export default Homepage
