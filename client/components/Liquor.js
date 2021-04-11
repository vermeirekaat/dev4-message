import Image from "next/image";

export default function Liquor({ drinks }) {
    console.log(drinks);
    return (
        <div>
            <h1>Liquor</h1>
            {/* liquors.map((liquor) => (
                <div>
                <p>{liquor.drink.name}</p>
                <Image src={liquor.drink.image}/>
                </div>
            ))*/}
        </div>

    )
}