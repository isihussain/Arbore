// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import CompactContact from './CompactContact'
import SecondaryMenu from 'containers/menu/SecondaryMenu'
import ContactDetail from 'containers/contact/ContactDetail'
import ContactAdder from 'components/contact/ContactAdder'
import SearchField from '../SearchField'

class ContactPage extends Component {

  props: {
    contacts: ContactList,
    onClickGenerator: (pubkey: string) => () => void,
    onSearchChange: () => void,
  }

  render() {
    const { classes, contacts, onClickGenerator, onSearchChange } = this.props
    const selectedPubKey = contacts.selectedPubkey
    const list = contacts.searched.sortBy((contact: Contact) => contact.identity)

    return (
      <div className={classes.wrapper}>
        <SearchField onChange={onSearchChange} />

        <SecondaryMenu />

        <div className={classes.list} >
          <ContactAdder/>
          {
            list.map((contact: Contact) =>
              <CompactContact
                key={ contact.pubkey }
                contact={contact}
                selected={contact.pubkey === selectedPubKey}
                onClick={onClickGenerator(contact.pubkey)}
              />
            )
          }
        </div>

        <div className={classes.details}>
          { selectedPubKey && <ContactDetail /> }
        </div>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridTemplateRows: 'auto 1fr',
    height: '100vh',
    backgroundColor: theme.palette.background.dark,
  },
  list: {
    overflow: 'auto',
    backgroundColor: theme.palette.background.main,
    padding: 10,
  },
  details: {
    overflow: 'auto',
    backgroundColor: theme.palette.background.main,
    padding: 10,
  }
})

export default withStyles(style)(ContactPage)
