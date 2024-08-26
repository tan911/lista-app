import { signout } from '../_actions/authentication'

export default async function Page() {
    return (
        <div>
            Hello world Dashboard!
            <div>
                <form action={signout}>
                    <button type="submit">Sign Out</button>
                </form>
            </div>
        </div>
    )
}
