cmd_/home/marjorie/modules/modules.order := {   echo /home/marjorie/modules/ram.ko; :; } | awk '!x[$$0]++' - > /home/marjorie/modules/modules.order
