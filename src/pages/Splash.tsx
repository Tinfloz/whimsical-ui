import CardComponent from "@/components/card/CardComponent"
import { useEffect, useState } from "react"
import axios from "axios"
import { getConfig } from "@/utils/get.token";

interface IPaintingGet {
    createdAt: string
    dimension: string 
    medium: string
    price: string
    paintingName: string
    paintingDesc: string
    updatedAt: string
    painting: string
    _id: string
}

const Splash = () => {

    const [myPaintings, setMyPaintings] = useState<IPaintingGet[]>([]);

    useEffect(() => {
        (async () => {
            const paintings = (await axios.get("http://localhost:5001/api/v1/content/get/paintings", getConfig())).data.paintings;
            setMyPaintings(_prevState => paintings);
        })()
    }, [])

    console.log(myPaintings)

  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-600 via-purple-400 to-purple-200 overflow-y-scroll flex flex-col items-center pt-10 pb-40 space-y-6">
        {
            myPaintings?.map((el: IPaintingGet) => (
                <CardComponent title={el.paintingName} description={el.paintingDesc} screenType="private" imageSrc={el.painting} id={el._id} key={el._id} price={el.price} dimension={el.dimension}/>
            ))
        }
    </div>
  )
}

export default Splash