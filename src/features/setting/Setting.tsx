import {NavLink} from "react-router-dom";
import styles from './Setting.module.scss'
import {CustomSlider} from "../../common/CustomSlider";
import {useAppDispatch} from "../../bll/store";

export const Setting = () => {

    const dispatch=useAppDispatch()

    const setValue = (value: any) => {
        console.log(value.target.value)
    }
    const setKindOfItems = (value: any) => {
        console.log(value.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <div className={styles.slider}>
                    Number of Items
                    <CustomSlider SetValue={setValue} min={2} max={5} isNumbers={true}/>
                </div>
                <div className={styles.slider}>
                    Value
                    <CustomSlider SetValue={setKindOfItems} min={1} max={6} isNumbers={false}/>
                </div>
                <div className={styles.slider}>
                    Direction
                    <div className={styles.direction}>
                        <button className={styles.directionButton} onClick={() => {
                        }} disabled={true}>To Up
                        </button>
                        <button className={styles.directionButton} onClick={() => {
                        }}>To Down
                        </button>
                    </div>
                </div>
                <NavLink to={'/game'} style={{textDecoration:"none"}}>
                    <button className={styles.gameButton}>
                        Start Game
                    </button>
                </NavLink>
            </div>
        </div>
    )
}