import styles from './Main.module.scss'
import {Coin} from "./Coin/Coin";
import React, {useRef, useState} from 'react';


export const Main = () => {

    const dragItem: any = useRef();
    const dragDiv: any = useRef();

    const [coins, setCoins] = useState([10, 20, 30, 40]);
    const [panels, setPanels] = useState<number[]>([]);

    const dragStart = (e: any) => {
        dragItem.current = e.target.innerHTML;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e: any) => {
        dragDiv.current = e.target.id;
        console.log(e.target.id);
    };

    const drop = () => {

        let itemIndex: number | null = coins.findIndex(f => f === +dragItem.current)

        const condition= ( (panels.length===0 && (Math.min(...coins)===+dragItem.current)) ? true : dragItem.current>panels[panels.length-1] )

        if (itemIndex !== -1 && dragDiv.current === 'panel'  && condition &&  (Math.min(...coins)===+dragItem.current) ){
            let dragItemContent = coins[itemIndex];
            setCoins(coins.filter(u => u !== dragItemContent))
            setPanels([...panels, dragItemContent])
            itemIndex = null;
        }

    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.table} id='coins' onDragEnter={dragEnter}>
                    {coins.map(c=>
                        <Coin  key={c} dragStart={dragStart} coin={c} drop={drop}/>
                    )}
                </div>
                <div className={styles.panel} id='panel' onDragEnter={dragEnter} >
                    {panels.map((p)=>
                       <Coin coin={p} key={p}/>
                    )}
                </div>
            </div>
        </div>
    )
}

