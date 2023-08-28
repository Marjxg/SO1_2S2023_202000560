cmd_/home/marjorie/modules/Module.symvers := sed 's/\.ko$$/\.o/' /home/marjorie/modules/modules.order | scripts/mod/modpost -m -a  -o /home/marjorie/modules/Module.symvers -e -i Module.symvers   -T -
