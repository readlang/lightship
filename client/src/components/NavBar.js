

function NavBar({user}) {

    return(
        <div>
            This is the NavBar.  Hello {user.username}
            <img src={user.profile_image} alt="profileimage"></img>
        </div>
    )
}

export default NavBar;