// Info de los modulos
#include <linux/module.h>
// Info del kernel en tiempo real
#include <linux/kernel.h>
#include <linux/sched.h>

// Headers para modulos
#include <linux/init.h>
// Header necesario para proc_fs
#include <linux/proc_fs.h>
// Para dar acceso al usuario
#include <asm/uaccess.h>
// Para manejar el directorio /proc
#include <linux/seq_file.h>
// Para get_mm_rss
#include <linux/mm.h>

struct sysinfo si;

static void init_meminfo(void){
    si_meminfo(&si);
}
MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM, Laboratorio Sistemas Operativos 1, 202000560");
MODULE_AUTHOR("Marjorie Gissell Reyes Franco");

static int escribir_archivo(struct seq_file *archivo, void *v) {
    init_meminfo();

    long long total_ram = si.totalram * si.mem_unit;
    long long free_ram = si.freeram * si.mem_unit;
    long long used_ram = total_ram - free_ram;
    unsigned int ram_usage_percentage = (used_ram * 100) / total_ram;

    seq_printf(archivo, "Total_RAM: %lld", total_ram);
    seq_printf(archivo, ",\n");
    seq_printf(archivo, "RAM_en_uso: %lld", used_ram);
    seq_printf(archivo, ",\n");
    seq_printf(archivo, "RAM_libre: %lld", free_ram);
    seq_printf(archivo, ",\n");
    seq_printf(archivo, "Porcentaje_en_uso: %u%%\n", ram_usage_percentage);

    return 0;
}

//Funcion cuando se ejecuta el comando cat nombremodulo.ko para leer el modulo
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Estructura proc_ops para el uso de Kernel mayor a 5.0
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

//Función cuando se ejecuta el comando insmod nombremodulo.ko para insertar modulo
static int _insert(void)
{
    proc_create("ram_202000560", 0, NULL, &operaciones);
    printk(KERN_INFO "202000560\n");
    return 0;
}

//Función cuando se ejecuta el comando rmmod nombremodulo.ko para borrar modulo
static void _remove(void)
{
    remove_proc_entry("ram_202000560", NULL);
    printk(KERN_INFO "Marjorie Gissell Reyes Franco\n");
}

module_init(_insert);
module_exit(_remove);