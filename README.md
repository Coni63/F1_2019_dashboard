
# F1 2019 - Dashboard

This repository is offering a capability to see the current position of each pilot during a race with few additionnal informations. 

![preview](https://github.com/Coni63/F1_2019_dashboard/blob/master/preview.png)

## How to use

### Install Python 3.5+

If you don't have python installed, you should install it from [python.org](https://www.python.org/downloads/). 
Pay attention to add it to the path during the installation:

![installation](https://datatofish.com/wp-content/uploads/2018/10/0001_add_Python_to_Path.png)

### Setup the environment

First, create in the backend's folder a virtual environment called `venv` and install all libraries in `requirements.txt` with:

"""console
cd backend
python -m venv ./venv
activate ./venv
pip install -r requirements.txt
"""

### Run the server

Everything is now set and you can run the server using:

"""console
cd backend
activate ./venv
python server.py
"""

## Adjust parameters

## Development

## Architecture

## Futurs Updates

This work is at early stage, there is still pending bugs and ideas for improvements such as:
 
- Adding sign if the pilot improved the position during the race (`^`, `-` or `v`)
- Improve/Fix layout for Mobile/Tablet
- Display only if Qualification or Race
- Prepare updates for F1-2020

## Acknowledgments

Thanks to the author of [f1-2019-telemetry's library](https://f1-2019-telemetry.readthedocs.io/en/latest/index.html)