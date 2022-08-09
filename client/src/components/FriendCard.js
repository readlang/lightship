import styled from "styled-components";

const Card = styled.div`
    margin: 10px;
    width: 150px;
    height: 100px;
    padding: 10px;
    color: hsl(0, 0%, 25%);
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid #6c757d;
    border-radius: .25rem;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`

function FriendCard({member}) {
    console.log(member)

    return(
        <Card>
            <h6>{member.user.username}</h6>
        </Card>
    )
}

export default FriendCard