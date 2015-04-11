# catfeeder
Cat feeder powered by Raspberry Pi :)

# Install
- Prepare sd card with Rasberry Pi  
- Configure Rasberry Pi (don't forget wifi)  
- Remove unnessessary packages:  
- sudo apt-get remove --purge wolfram-engine cron anacron logrotate dbus dphys-swapfile xserver-common lightdm fake-hwclock 
- sudo insserv -r x11-common  
- sudo apt-get autoremove --purge  
- Clock sync: sudo apt-get install ntpdate  
- add "/usr/sbin/ntpdate -b de.pool.ntp.org" to /etc/rc.local
- We need node.js of course: sudo apt-get install nodejs  
