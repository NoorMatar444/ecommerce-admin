import { NextResponse } from "next/server";
import axios from "axios";



export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
   
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : "8.8.8.8"; 

    
    const response = await axios.get(`https://ipinfo.io/${ip}/json?token=YOUR_API_TOKEN`);

    return NextResponse.json({ 
      country: response.data.country,
      city: response.data.city 
    });

  } catch (error) {
    console.error('[LOCATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
