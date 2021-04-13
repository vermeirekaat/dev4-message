import Image from "next/image";

export default function Liquor({ sodas }) {
    console.log(sodas);
    return (
        <div>
            <h1>Liquor</h1>
            {sodas.map((soda) => (
                <div key={soda.id}>
                <p>{soda.name}</p>
                {/* <Image src={liquor.drink.image.url}
                        width={liquor.drink.image.width}
                        height={liquor.drink.image.height}/>
                */}
                </div>
            ))}
        </div>

    )
}