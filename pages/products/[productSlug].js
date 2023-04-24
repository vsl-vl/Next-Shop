import { ProductCard } from "@/components/static-components"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { Poppins, Roboto } from "next/font/google"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

export async function getStaticPaths () {
    const client = new ApolloClient({
        uri: "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clg8901wq1rlh01tf1z96c1oa/master",
        cache: new InMemoryCache(),
    })

    const data = await client.query({
        query: gql`
            {
                products{
                    id
                    name
                    slug
                }
            }
        `
    })

    const paths = data.data.products.map((product) => {
        return{
            params: {
                productSlug: product.slug,
            }
        }
    })

    return{
        paths,
        fallback: false,
    }
}

export async function getStaticProps ({ params }) {
    const client = new ApolloClient({
        uri: "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clg8901wq1rlh01tf1z96c1oa/master",
        cache: new InMemoryCache(),
    })

    const data = await client.query({
        query: gql`
            query MyQuery($slug: String){
                product(where: { slug: $slug }) {
                    id
                    name
                    slug
                    images{
                        id
                        url
                    }
                    description
                    price
                }
            }
        `,

        variables: {
            slug: params.productSlug
        }
    })

    const product = data.data.product;

    const products = await client.query({
        query: gql`
          {
            products {
              id
              slug
              name
              price
              categories{
                id
                slug
                name
              }
              images{
                id
      
                url
              }
            }
          }
        `
    })

    const productsData = products.data.products;

    return{
        props: {
            product,
            productsData
        }
    }
}

const fontStyle = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900']
})

const Product = ({ product, productsData }) => {

    const filteredBy = (filteredItem) => filteredItem.id !== product.id;

    const filteredProducts = productsData.filter(filteredBy)

    return(
        <>
            <Head>
                <title>Next Shop | {product.name}</title>
            </Head>
            <main className={fontStyle.className}>
                <section className="border-[rgba(0,0,0,0.1)] border-b-1">
                    <article className="flex justify-start items-center min-h-[70px] gap-1 font-medium px-8">
                        <Link href={"/"}>Home</Link> {"/"} {product.name}
                    </article>
                </section>
                <section>
                    <article className="flex flex-col md:flex-row flex-wrap pt-8">
                        <div className="md:basis-1/2 p-20 shadow-xl rounded-xl">
                            <img src={product.images['0'].url} width={100} height={100} alt={""} className="w-full" />
                        </div>
                        <div className="md:basis-1/2 p-5 md:p-20 flex flex-col gap-5 items-start">
                            <h1 className="text-[2em] font-bold text-default">{product.name}</h1>
                            <span className="font-medium text-md text-default">{product.description}</span>
                            <span className="text-xl font-medium">{product.price}$</span>
                            
                            <button
                                className="btn snipcart-add-item"
                                data-item-id={product.id}
                                data-item-price={product.price}
                                data-item-url={`products/${product.slug}`}
                                data-item-image={product.images['0'].url}
                                data-item-name={product.name} 
                            >
                            Add to cart 🛒
                            </button>                                                               
                        </div>
                    </article>

                    <article>
                        <h1 className="py-12 text-xl font-bold px-5">Releated Products:</h1>
                        <div className="flex flex-wrap">
                            {filteredProducts.map((product) =>
                                <ProductCard key={product.id} product={product} />
                            )}
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}

export default Product;
