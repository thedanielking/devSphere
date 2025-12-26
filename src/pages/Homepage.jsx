import Filter from "../components/Filter"
import Header from "../components/Header"
import Posts from "../components/Posts"

function Homepage() {
    return (
        <div>
            <Header />
            <section className="">
                <Filter />
                <Posts />
            </section>
        </div>
    )
}

export default Homepage
