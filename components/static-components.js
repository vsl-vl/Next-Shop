import Link from "next/link"
import { Nunito_Sans } from "next/font/google"
import Image from "next/image"

const fontStyle = Nunito_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700', '800', '900']
})

export const Navigation = () => {
    return(
        <nav className={`${fontStyle.className} h-[100px] border-b-1 border-rgb1 fixed top-0 left-0 right-0 bg-white`}>
            <article className="flex justify-between items-center h-full">
                <Logo />
                <Card />
            </article>
        </nav>
    )
}

export const Logo = () => {
    return(
        <Link href={"/"} className="text-xl font-bold px-4 py-2 bg-default text-white rounded-sm">
            COMMERCE
        </Link>
    )
}

export const Footer = () => {
    return(
        <section className={`${fontStyle.className} border-t-1 mt-10`}>
            <article className="flex justify-between items-center py-10">
                <Logo />
                <p className="font-medium">® All Rights Reserved</p>
            </article>
        </section>
    )
}

export const Card = () => {
    return(
        <div className="nav-price snipcart-checkout cursor-pointer">
            <span>🛒</span>
            <span className="snipcart-total-price">$0.00</span>
        </div>
    )
}

export const ProductCard = ({product}) => {

    return(
        <div className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-3">
            <div className="shadow-xl rounded-md min-h-[250px] p-10 flex flex-col gap-5">
                <Link href={`/products/${product.slug}`}>
                    <Image src={product.images['0'].url} width={100} height={100} alt={""} className="w-full h-[400px] md:h-[200px] object-cover" />
                </Link>
                <span className="flex justify-between">
                    <span>{product.categories['0'].name}</span>
                    <span>{product.price}$</span>
                </span>
                <div>
                    <button
                        className="btn snipcart-add-item bg-default px-5 py-2 w-full rounded-full text-white font-medium"
                        data-item-id={product.id}
                        data-item-price={product.price}
                        data-item-url={`products/${product.slug}`}
                        data-item-image={product.images['0'].url}
                        data-item-name={product.name} 
                    >
                    Add to cart
                    </button> 
                </div>
            </div>
        </div>
    )
}
