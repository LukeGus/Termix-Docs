# Server Stats Service Documentation

The metrics collection scripts are designed **exclusively for Linux-based operating systems**.

The service relies on commands and virtual filesystems (`/proc`) that are standard on most modern Linux distributions (like Debian, Ubuntu, CentOS, Fedora, Arch, etc.). It is **not** compatible with other operating systems such as Windows, macOS, or other UNIX variants like FreeBSD without significant modification, as they use different commands and system interfaces for metric collection.


## Commands

For the service to collect all available metrics, the authenticated user on the remote server must have permission to execute the following commands. These are standard, non-privileged utilities found on most Linux systems.

| Metric Category     | Command(s)                                                                                                                            | Purpose                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **CPU**             | `cat /proc/stat`                                                                                                                      | Reads CPU time statistics (user, system, idle, etc.) to calculate usage percentage.                 |
|                     | `cat /proc/loadavg`                                                                                                                   | Reads the 1, 5, and 15-minute system load averages.                                                 |
|                     | `nproc` or `grep -c ^processor /proc/cpuinfo`                                                                                         | Determines the number of available CPU cores.                                                       |
| **Memory**          | `cat /proc/meminfo`                                                                                                                   | Reads detailed memory statistics (total, free, available, buffers, cached) to calculate usage.    |
| **Disk**            | `df -h -P /`                                                                                                                          | Gets human-readable disk usage for the root filesystem (`/`).                                       |
|                     | `df -B1 -P /`                                                                                                                         | Gets disk usage in bytes for the root filesystem to calculate the percentage.                       |
| **Network**         | `ip -o addr show`                                                                                                                     | Lists network interfaces and their associated IP addresses.                                         |
|                     | `ip -o link show`                                                                                                                     | Lists network interfaces and their operational state (e.g., UP/DOWN).                               |
| **Uptime**          | `cat /proc/uptime`                                                                                                                    | Reads the system uptime in seconds.                                                                 |
| **Processes**       | `ps aux --sort=-%cpu \| head -n 11`                                                                                                   | Lists the top 10 processes sorted by CPU usage.                                                     |
|                     | `ps aux \| wc -l`                                                                                                                     | Counts the total number of running processes.                                                       |
|                     | `ps aux \| grep -c ' R '`                                                                                                             | Counts the number of processes in the "Running" state.                                              |
| **System Info**     | `hostname`                                                                                                                            | Gets the system's hostname.                                                                         |
|                     | `uname -r`                                                                                                                            | Gets the kernel release version.                                                                    |
|                     | `cat /etc/os-release`                                                                                                                 | Reads the OS distribution's "pretty name" (e.g., "Ubuntu 22.04.1 LTS").                             |
| **Login Stats**     | `last -n 20 -F -w`                                                                                                                    | Shows the 20 most recent successful user logins.                                                    |
|                     | `grep 'Failed password' /var/log/auth.log` or `grep 'authentication failure' /var/log/secure`                                          | Reads common system log files to find the 10 most recent failed login attempts. Access may be restricted. |

## Support

If you need help or want to request a feature with Termix, visit the [Issues](https://github.com/Termix-SSH/Support/issues) page, log in, and press `New Issue`.
Please be as detailed as possible in your issue, preferably written in English. You can also join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support
channel, however, response times may be longer.
