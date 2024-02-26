import ProtoType from 'prop-types'
import Email from './Email'
import '../styles/emails.css'



const Emails = (props) => {

    Emails.ProtoType = {
        emails: ProtoType.string,
        setEmails : ProtoType.func,
        hideRead: ProtoType.bool,
        currentTab: ProtoType.string
    }

    const {emails, setEmails, hideRead, currentTab} = props 

    
    const getReadEmails = emails => emails.filter(email => !email.read)

    const getStarredEmails = emails => emails.filter(email => email.starred)

    let filteredEmails = emails

    if (hideRead) filteredEmails = getReadEmails(filteredEmails)
  
    if (currentTab === 'starred')
      filteredEmails = getStarredEmails(filteredEmails)


    const toggleStar = targetEmail => {
        const updatedEmails = emails =>
          emails.map(email =>
            email.id === targetEmail.id
              ? { ...email, starred: !email.starred }
              : email
          )
        setEmails(updatedEmails)
      }
    
      const toggleRead = targetEmail => {
        const updatedEmails = emails =>
            emails.map(email =>
                email.id === targetEmail.id ? { ...email, read: !email.read } : email
          )
        setEmails(updatedEmails)
      }
    
    return (
        <main className="emails">
        <ul>
          {filteredEmails.map((email, index) => (
            <Email {...{email, toggleRead, toggleStar}} key={index}/>
          ))}
        </ul>
        </main>
    )

}

export default Emails;