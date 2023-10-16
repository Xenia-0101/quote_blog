import Styles from "./HeaderComponent.module.css"


export default function HeaderComponent({children}) {
  return (
    <>
        <div className={Styles.wrapper}>
            <span id={Styles.appName}>My API App</span>
            {children}
        </div>
    </>
  )
}
