import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { ProductCard } from "@/components/static-components";

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clg8901wq1rlh01tf1z96c1oa/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
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

  const products = data.data.products;

  return{
    props: {
      products,
    }
  }
}

export default function Home ({ products }) {

  return(
    <>
      <Head>
        <title>Next Shop | Home</title>
      </Head>
      <main>
      <section className="w-full h-[60vh] bg-default">
        <article className="text-white flex flex-col gap-2 h-full justify-center">
          <h1 className="text-[3.5em] md:[text-[4.5em] font-bold">Get Start</h1>
          <h1 className="text-[2em] md:text-[2.5em] font-medium">Your favourite Shopping</h1>
        </article>
      </section>
        <article>
          <h1 className="text-center text-[40px] my-10 font-bold text-default ">Products</h1>
          <div className="flex flex-wrap">
            {products.map((product) =>
              <ProductCard key={product.id} product={product} />
            )}
          </div>
        </article>
      </main>
    </>
  )
}
