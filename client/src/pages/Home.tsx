import { Link } from 'react-router-dom';

const collections = [
  {
    name: 'Placeholder',
    imageSrc: '/images/1200x1200.svg',
    imageAlt: 'Placeholder',
    description: 'Placeholder description',
  },
  {
    name: 'Placeholder',
    imageSrc: '/images/1200x1200.svg',
    imageAlt: 'Placeholder',
    description: 'Placeholder description',
  },
  {
    name: 'Placeholder',
    imageSrc: '/images/1200x1200.svg',
    imageAlt: 'Placeholder',
    description: 'Placeholder description',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src="/images/2716x1600.svg"
            alt="Placeholder"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Text
          </h1>
          <p className="mt-4 text-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum modi
            molestias necessitatibus iste ex a, est voluptatum doloremque
            nostrum consequuntur voluptate porro asperiores, dolor libero, eius
            fugit ratione repellendus similique.
          </p>
        </div>
      </div>

      <main>
        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8">
          <h2
            id="collection-heading"
            className="text-2xl font-bold tracking-tight text-gray-900">
            Shop by Collection
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quas
            doloremque natus at repellat excepturi perferendis. Pariatur,
            voluptatibus? Magni velit maiores iste debitis labore adipisci eos
            perferendis quo dolores illum.
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {collections.map((collection) => (
              <Link key={collection.name} className="group block" to="/">
                <div
                  aria-hidden="true"
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75">
                  <img
                    src={collection.imageSrc}
                    alt={collection.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {collection.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="comfort-heading"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src="/images/2716x1600.svg"
                alt="Placeholder"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="comfort-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Placeholder
                </h2>
                <p className="mt-3 text-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  modi molestias necessitatibus iste ex a, est voluptatum
                  doloremque nostrum consequuntur voluptate porro asperiores,
                  dolor libero, eius fugit ratione repellendus similique.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
