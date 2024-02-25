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

export default function ImportToken({ contract: { id, type, symbol }, color, size }: { contract: Contract, color: string, size: string }) {
    let [added, setAdded] = useState<boolean>();
    let [failed, setFailed] = useState<undefined | any>(undefined);
    if (type != "ERC20") return <></>
    if (added) return <CheckCircle size={size} color="green" />
    if (failed) return <XCircle size={size} color="red" />
    return <Import size={size} color={color} onClick={async () => {
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