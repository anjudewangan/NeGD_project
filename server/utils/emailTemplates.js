exports.newTicketTemplate = (ticketNo, subject) => {
    return {
        body: `A new ticket has been opened with ticket id ${ticketNo} and subject ${subject}`,
        subject: `Ticket #${ticketNo} ${subject}`
    }
}