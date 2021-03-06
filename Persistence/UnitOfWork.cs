using System.Threading.Tasks;
using vega.Core; 

namespace vega.Persistence
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly VegaDBContext context;

    public UnitOfWork(VegaDBContext context)
    {
      this.context = context;
    }

    public async Task CompleteAsync()
    {
      await context.SaveChangesAsync();
    }
  }
}