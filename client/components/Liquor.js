import Image from "next/image";

export default function Liquor({ liquors }) {

    return (
        <div>
            <h1>Liquor</h1>
            {liquors.map((liquor) => (
                <div key={liquor.id}>
                <p>{liquor.name}</p>
                {/* <Image src={liquor.drink.image.url}
                        width={liquor.drink.image.width}
                        height={liquor.drink.image.height}/>
                */}
                </div>
            ))}
        </div>

    )
}