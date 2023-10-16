import Styles from "./Quotes.module.css"

export default function Home() {
  return (
    <>
      
      <div className={Styles.homeWrapper}>
        <div className={Styles.heading}>
        </div>
        <div className={Styles.subheading}>
          Welcome to my Flask powered React app!

        </div>
        <div className={Styles.quotesWrapper}>
        This site allows you to post your favourite quotes and share them with other app users.
        To use this app, you have to be registered (or you can use &quot;test&quot; as username and password when logging in).
        After you log in, you will be redirected to the Quotes site, where you can add a new quote to the database.
        To see all the quotes you have posted, navigate to Profile. You can also edit your account description there.
        To log out, click the logout button in the header of the app.

        <div >
          <span>Pages</span>
          <div className="project-pages">
            <span className="pp-head">Page</span>
            <span className="pp-head">Route</span>
            <span className="pp-head">Requests</span>
            <span className="pp-head">Description</span>

            <span>Home</span>
            <span>&quot; / &quot;</span>
            <span>---</span>
            <span>contains the page description</span>

            <span>Profile</span>
            <span>&quot; /profile &quot;</span>
            <span>---</span>
            <span>contains the page description</span>


          </div>

        </div>
        
        </div>

        

      </div>
      
    </>
  )
}
