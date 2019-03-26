# DirectAdmin for Homey

Monitor your [DirectAdmin](https://www.directadmin.com) servers and domains.

> **Important:** The refresh interval of the data shown for some statistics in the app, depend on how many times a day the [stats tally](https://help.directadmin.com/item.php?id=48) command is executed on the server. By default this is once a day. Please contact your server administrator if you have any questions about this.

Homey will automatically refresh the data every **15 minutes**.

If you like this app, consider a donation to support development:

[![Paypal donate][pp-donate-image]][pp-donate-link]


## Statistics

### Server (*admin only*)
- License information
- Current DirectAdmin version
- Number of domains on the server
- Number of email accounts (POP) on the server
- Number of email forwarders on the server
- Number of MySQL databases on the server
- Number of resellers on the server
- Number of users on the server
- Total bandwidth of the server (insights)
- Software update available
- Operating system

### Domain
- Domain is active
- Domain is suspended
- Domain bandwidth (insights)
- Domain disk usage (insights)
- Email accounts
- Email disk usage


## Supported triggers
- When software update is available

## Supported languages
- English
- Dutch (Nederlands)


## Support / feedback
If you have any questions or feedback, please contact me on [Slack](https://athomcommunity.slack.com/team/evdpol).

Please report issues and feature requests at the [issues section](https://github.com/edwinvdpol/com.directadmin/issues) on GitHub.


## Changelog
[Check it out here!](https://github.com/edwinvdpol/com.directadmin/blob/master/CHANGELOG.md)

[pp-donate-link]: https://www.paypal.me/edwinvdpol
[pp-donate-image]: https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif