import { CheckCircle, Import, XCircle } from "lucide-react";
import { useState } from "react";

declare global {
    interface Window {
        ethereum: any
    }
}
interface Contract {
    id: string,
    type: "Native" | "ERC20" | "ERC721" | "ERC1155" | "SRC20" | "SRC721" | "SRC1155";
    symbol: string,
}
export default function ImportToken({ contract: { id, type, symbol } }: { contract: Contract }) {
    let [added, setAdded] = useState<boolean>();
    let [failed, setFailed] = useState<undefined | any>(undefined);
    if (type != "ERC20") return <></>
    if (added) return <CheckCircle size="24px" color="green" />
    if (failed) return <XCircle size="24px" color="red" />
    return <Import size="24px" color="grey" onClick={async () => {
        try {
            setAdded(await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type,
                    options: {
                        symbol,
                        address: id,
                        decimals: 18,
                        image: "https://avatars.githubusercontent.com/u/49308834",
                    },
                },
            }))
        } catch (error: any) {
            if (error.code != 4001) {
                console.log(error)
                setFailed(error);
            }
        }
    }} />
}