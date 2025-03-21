import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">¡Ups! Página No Encontrada</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <svg
            width="200px"
            height="200px"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -5879.000000)" fill="currentColor">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M100,5732.0001 C100,5732.5521 99.552,5733.0001 99,5733.0001 L89,5733.0001 C88.448,5733.0001 88,5732.5521 88,5732.0001 L88,5732.0001 C88,5731.4481 88.448,5731.0001 89,5731.0001 L99,5731.0001 C99.552,5731.0001 100,5731.4481 100,5732.0001 L100,5732.0001 Z M102,5735.6151 C102,5736.1671 101.552,5737.0001 101,5737.0001 L87,5737.0001 C86.448,5737.0001 86,5736.1671 86,5735.6151 L86,5728.6151 C86,5727.0191 86.475,5725.5331 87.284,5724.2831 L88.586,5725.5851 L87.586,5726.5851 C87.195,5726.9751 87.195,5727.6091 87.586,5727.9991 C87.976,5728.3901 88.609,5728.3901 89,5727.9991 L90,5726.9991 L91,5727.9991 C91.391,5728.3901 92.024,5728.3901 92.414,5727.9991 L92.414,5727.9991 C92.805,5727.6091 92.805,5726.9751 92.414,5726.5851 L91.414,5725.5851 L92.414,5724.5851 C92.805,5724.1941 92.805,5723.5611 92.414,5723.1711 L92.414,5723.1711 C92.024,5722.7801 91.391,5722.7801 91,5723.1711 L90,5724.1711 L88.579,5722.7491 C90.006,5721.4291 91.907,5721.0001 94,5721.0001 C96.093,5721.0001 97.994,5721.4291 99.421,5722.7491 L98,5724.1711 L97,5723.1711 C96.609,5722.7801 95.976,5722.7801 95.586,5723.1711 L95.586,5723.1711 C95.195,5723.5611 95.195,5724.1941 95.586,5724.5851 L96.586,5725.5851 L95.586,5726.5851 C95.195,5726.9751 95.195,5727.6091 95.586,5727.9991 C95.976,5728.3901 96.609,5728.3901 97,5727.9991 L98,5726.9991 L99,5727.9991 C99.391,5728.3901 100.024,5728.3901 100.414,5727.9991 L100.414,5727.9991 C100.805,5727.6091 100.805,5726.9751 100.414,5726.5851 L99.414,5725.5851 L100.716,5724.2831 C101.525,5725.5331 102,5727.0191 102,5728.6151 L102,5735.6151 Z M102,5722.6331 C99.924,5719.8621 97.467,5719.0001 94,5719.0001 C90.53,5719.0001 88.074,5719.8641 86,5722.6331 C84.75,5724.3031 84,5726.3691 84,5728.6151 L84,5736.6151 C84,5737.7201 84.895,5739.0001 86,5739.0001 L102,5739.0001 C103.105,5739.0001 104,5737.7201 104,5736.6151 L104,5728.6151 C104,5726.3691 103.25,5724.3031 102,5722.6331 L102,5722.6331 Z"
                    id="emoji_neutral-[#526]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          {/* <p className="text-center text-muted-foreground"> */}
          {/*   Parece que este producto se ha agotado... ¡en el inventario de nuestro sitio web! */}
          {/* </p> */}
          {/* <p className="text-center font-semibold"> */}
          {/*   No te preocupes, ¡nuestros estantes digitales siguen llenos de grandes ofertas! */}
          {/* </p> */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Volver a Comprar</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
