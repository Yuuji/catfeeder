# catfeeder
Cat feeder powered by Raspberry Pi :)

# Install
- Prepare sd card with Rasberry Pi  
- Configure Rasberry Pi (don't forget wifi)  
- Remove unnessessary packages:  
- sudo apt-get update  
- sudo apt-get upgrade  
- sudo apt-get remove --purge wolfram-engine cron anacron logrotate dbus dphys-swapfile xserver-common lightdm fake-hwclock 
- sudo insserv -r x11-common  
- sudo apt-get autoremove --purge  
- Clock sync: sudo apt-get install ntpdate  
- add "/usr/sbin/ntpdate -b de.pool.ntp.org" to /etc/rc.local
- We need node.js of course:
- sudo su -  
- cd /opt 
- wget http://nodejs.org/dist/v0.10.25/node-v0.10.25-linux-arm-pi.tar.gz  
- tar xvzf node-v0.10.25-linux-arm-pi.tar.gz  
- ln -s node-v0.10.25-linux-arm-pi node  
- chmod a+rw /opt/node/lib/node_modules  
- chmod a+rw /opt/node/bin  
- echo 'PATH=$PATH:/opt/node/bin' > /etc/profile.d/node.sh  
- close ssh session or reboot
